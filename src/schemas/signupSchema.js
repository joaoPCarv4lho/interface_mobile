import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string()
        .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
        .transform((name) =>
            name
            .trim()
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")
        ),
    email: z.string().email({ message: "E-mail inválido" }).toLowerCase(),
    password: z.string().min(8, "A senha deve possuir no mínimo 8 caracteres" ),
    confirmPassword: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
})
.refine((data)=> data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
});
