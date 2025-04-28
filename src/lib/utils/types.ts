import { z } from "zod";
import { loginFormSchema } from "@/lib/utils/schemas";
export type LoginFormType = z.infer<ReturnType<typeof loginFormSchema>>;
