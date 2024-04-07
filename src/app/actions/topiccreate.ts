"use server";

import { z } from "zod";
import { auth } from "@/auth";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormSate {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[]
  };
}

export async function createTopic(
  formSate: CreateTopicFormSate,
  formData: FormData
): Promise <CreateTopicFormSate> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  const session = await auth()

  if(!session || !session.user){
    return{
      errors: {
        _form: ['You must be logged in to create a topic']
      }
    }
  }

  return {
    errors: {}
  }
  // TODO:REVALIDATE THE HOMEPAGE
}
