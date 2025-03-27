
import { AuthenticationMotion } from "@/components/custom/AuthenticationMotion/AuthenticationMotion";
import LocaleToggle from "@/components/custom/LocaleToggle/LocaleToggle";
import { LoginForm } from "@/components/custom/LoginForm/LoginForm";
import Logo from "@/components/custom/Logo/Logo";
import ModeToggle from "@/components/custom/ModeToggle/ModeToggle";
import { useTranslations } from "next-intl";

export default function AuthPage() {
  const t = useTranslations('AuthPage');

  return (
    <div className='flex flex-col sm:flex-row h-screen w-screen'>
      <Logo className='sm:hidden m-4' />
      <div className='hidden sm:flex flex-col bg-secondary w-1/2 p-8 justify-between'>
        <Logo />
        <div>
          <p className='text-lg'>
            {`"${t('cuteMessage')}"`}
          </p>
          <p>
            {`— ${t('mottoAuthor')}`}
          </p>
        </div>
      </div>
      <div className='w-full sm:w-1/2 flex flex-col items-center justify-center'>
        <div className='absolute top-0 right-0 m-4'>
          <div className="flex flex-row gap-2">
            <ModeToggle />
            <LocaleToggle />
          </div>
        </div>
        <AuthenticationMotion />
      </div>
    </div>
  );
}
