"use server"

export async function createTopic(formData: FormData) {
    // TODO:REVALIDATE THE HOMEPAGE
    const name = formData.get('name')
    const description = formData.get('description')

    console.log(name, description)
}