"use server";

import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import Paths from "@/paths";

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
  await new  Promise((resolve) => setTimeout(resolve, 2500)) // Simulate a slow API response          
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

  let topic: Topic
try {
  topic = await db.topic.create({
    data: {
      slug: result.data.name,
      description: result.data.description
    }
  })
  
} catch (err: unknown) {
  if( err instanceof Error) {
    return {
      errors: {
        _form: [err.message]
      }
    } 
  } else {
    return {
      errors: {
        _form: ['An unexpected error occurred']
      }
    }
  }
}

// TODO:REVALIDATE THE HOMEPAGE
revalidatePath('/')
redirect(Paths.showTopic(topic.slug))

}
