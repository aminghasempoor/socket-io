// مثلا توی login.tsx یا هر کامپوننتی
import { auth } from "@/lib/firebase"; // مسیرت ممکنه فرق کنه
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function handleGoogleLogin() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // اطلاعات کاربر اینجا قابل دسترسه
        const user = result.user;
        console.log("User info:", user);
    } catch (error) {
        console.error("Google login error:", error);
    }
}
