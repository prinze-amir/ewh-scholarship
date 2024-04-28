import ColorPicker from "@/components/forms/colorPicker";
import { RegisterForm } from "@/components/forms/newUserForm";
import { Users } from "@/components/Users/user";
import { getUsers } from "@/app/actions";
import { Suspense } from "react";
import { getSettings } from "./actions";
import { EmailAccount } from "@/components/forms/emailAccount";

export default async function Settings() {
  let account = "";
  const settings = await getSettings();
  if (settings[0].emailService) {
    account = JSON.parse(JSON.stringify(settings[0].emailService));
  }
  const theme = JSON.parse(JSON.stringify(settings[0].themeSettings));
  const users = await getUsers();


  return (
    <div className="flex gap-4 flex-wrap justify-center items-baseline">
      <div className="flex flex-col gap-4">
        <ColorPicker theme={theme} />
        <EmailAccount account={account} />
      </div>
      <RegisterForm />

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Users initialUsers={users} />
        </Suspense>
      </div>
    </div>
  );
}
