/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  type RegisterSchemaType,
} from "@/lib/schemas/auth.schema";
import Link from "next/link";
import { handleRegister } from "@/app/api/auth.api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      birthdate: undefined,
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    const response = await handleRegister(data);

    if (response.wasValid) {
      Swal.fire({
        icon: "success",
        title: response.message,
        confirmButtonColor: "var(--primary)",
      }).then(() => {
        router.push("/auth/signin");
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops",
        text: response.message,
        confirmButtonColor: "var(--primary)",
      });
    }

    reset();
  };

  return (
    <div className="mt-16">
      <p className="text-2xl font-semibold text-primary text-center ">
        Registrate
      </p>
      <form
        className="space-y-8 w-[400px]  mt-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <input
            className=" border-[1px] h-14 border-primary  rounded-xl p-2 "
            type="text"
            placeholder="Nombres"
            {...register("firstname")}
          />
          {errors.firstname && (
            <p className="text-xs text-red-500">{errors.firstname.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            className=" border-[1px] h-14 border-primary  rounded-xl p-2 "
            type="text"
            placeholder="Apellidos"
            {...register("lastname")}
          />
          {errors.lastname && (
            <p className="text-xs text-red-500">{errors.lastname.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            className=" border-[1px] h-14 border-primary  rounded-xl p-2 "
            type="date"
            placeholder="edad"
            {...register("birthdate")}
          />
          {errors.birthdate && (
            <p className="text-xs text-red-500">{errors.birthdate.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            className=" border-[1px] h-14 border-primary  rounded-xl p-2 "
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative flex flex-col">
          <input
            className="border-[1px] h-14 rounded-xl border-primary p-2 pr-10"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Image
              src={showPassword ? "/eye-off.svg" : "/eye.svg"}
              alt="Toggle password visibility"
              width={24}
              height={24}
            />
          </button>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button className="btn btn-neutral w-full" type="submit">
          Registrarse
        </button>
      </form>
      <p className="text-center mt-7">
        ¿Ya tienes una cuenta?{" "}
        <Link
          className="btn no-underline btn-link text-primary"
          href={"/auth/signin"}
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
