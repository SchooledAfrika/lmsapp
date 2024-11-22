// here we write a custom function to send message to single or multiple users

export const MessageUsers = async (
  email: string | string[],
  subject: string,
  message: string
) => {
  const messaging = await fetch(
    `${process.env.Email_link}message-to-singleTeacher`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        subject,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (messaging.ok) {
    return new Response(
      JSON.stringify({ message: "message sent was successful" }),
      { status: 200 }
    );
  } else {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
};
