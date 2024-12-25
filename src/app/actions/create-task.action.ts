"use server";

export async function createTask(formData: FormData) {
  const task = {
    description: formData.get("description"),
    public: formData.get("public-task"),
  };

  console.log(task);
}
