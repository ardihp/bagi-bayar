import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({});

export default function CreateMode() {
  const {} = useForm({});

  return <form className="flex flex-col"></form>;
}
