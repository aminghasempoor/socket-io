"use client";

import useUserStore from "@/lib/utils/userStore";
import { useEffect } from "react";

const UserInitializer = () => {
    const initialize = useUserStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return null;
};

export default UserInitializer;
