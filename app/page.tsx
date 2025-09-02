import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex justify-center mt-12">
      <div className="w-80 rounded-2xl border border-gray-200 p-6 text-center shadow-md">
        {!session ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Welcome</h2>
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-800"
              >
                Sign in with GitHub
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Signed in</h2>
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="avatar"
                className="mx-auto mb-4 h-16 w-16 rounded-full"
              />
            )}
            <p className="mb-1 font-medium">{session.user?.name}</p>
            <p className="mb-6 text-sm text-gray-500">{session.user?.email}</p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-500"
              >
                Sign out
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
