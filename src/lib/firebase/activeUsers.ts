import { db } from "@/config/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";

// Function to update user's last active timestamp
export const updateUserActivity = async (userId: string) => {
  try {
    const userActivityRef = doc(db, "userActivity", userId);
    await setDoc(
      userActivityRef,
      {
        lastActive: serverTimestamp(),
        userId: userId,
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating user activity:", error);
  }
};

// New function using real-time updates
export const subscribeToActiveUsers = (
  callback: (count: number) => void
): (() => void) => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const q = query(
    collection(db, "userActivity"),
    where("lastActive", ">", Timestamp.fromDate(fiveMinutesAgo))
  );

  // Set up real-time listener
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.size);
    },
    (error) => {
      console.error("Error listening to active users:", error);
      callback(0);
    }
  );

  return unsubscribe;
};
