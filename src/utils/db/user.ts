import { firestore } from "../../firebase";
import firebase from "firebase";

const { serverTimestamp } = firebase.firestore.FieldValue;

export const getUserInfo = async (uid: string) => {
  const cachedUserInfo = localStorage.getItem("userInfo");
  if (cachedUserInfo) {
    return JSON.parse(cachedUserInfo) as UserDocument;
  }
  const response = await firestore.collection("users").doc(uid).get();
  const data = response.data() as UserDocument | undefined;
  return data || undefined;
};

export const setUserInfo = async (currentUser: firebase.User) => {
  const userDoc: UserSchema = {
    currency: "ILS",
    savingGoal: "25",
    createdOn: serverTimestamp(),
    categories: [],
  };
  try {
    await firestore.collection("users").doc(currentUser.uid).set(userDoc);
    localStorage.setItem("userInfo", JSON.stringify(userDoc));
  } catch (e) {
    console.log(e);
  }
};

export const updateUserInfo = async (
  uid: string,
  query: string,
  newVal: string
) => {
  const cachedUserInfo = localStorage.getItem("userInfo");
  if (cachedUserInfo) {
    const userInfo = JSON.parse(cachedUserInfo) as UserDocument;
    /// @ts-ignore
    userInfo[query] = newVal;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }
  const fieldToUpdate: any = {};
  fieldToUpdate[query] = newVal;
  try {
    firestore.collection("users").doc(uid).update(fieldToUpdate);
    return Promise.resolve();
  } catch (e) {
    console.log(e);
  }
};

export const getUserCategories = async (
  uid: string
): Promise<string[] | void> => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { categories } = JSON.parse(userInfo) as UserDocument;
    return categories;
  }
  try {
    const response = await firestore.collection("users").doc(uid).get();
    const data = response.data() as UserDocument | undefined;
    return data ? data.categories : undefined;
  } catch (e) {
    console.log(e);
  }
};

export const updateUserCategories = async (uid: string, category: string) => {
  try {
    category = category.toLowerCase();
    const userCategories = await getUserCategories(uid);
    if (userCategories) {
      if (userCategories.includes(category)) return;
      else {
        userCategories.push(category);
        firestore.collection("users").doc(uid).update({
          categories: userCategories,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
interface UserSchema {
  currency: "ILS";
  savingGoal: string;
  createdOn: any;
  categories: string[];
}

export interface UserDocument extends UserSchema {}
