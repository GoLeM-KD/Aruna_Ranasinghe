import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import Loading from './Loading'
export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <Suspense fallback={<Loading/>}>
        <SignIn />
      </Suspense>
    </div>
  );
}