
import { Club } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className='flex flex-row h-screen w-screen'>
      <div className='bg-zinc-800 w-1/2 p-8 flex flex-col justify-between'> 
        <h1 className='text-white text-2xl font-mono flex flex-row gap-2 items-center'>
          <Club size={20} />
          Cruser
        </h1>
        <div>
          <p className='text-white text-lg'>
            {`"${t('cuteMessage')}"`}
          </p>
          <p>
            {`— ${t('mottoAuthor')}`}
          </p>
        </div>
      </div>
      <div className='w-1/2 flex flex-col items-center justify-center'>
        <h1>{t('loginForm.title')}</h1>
      </div>
    </div>
  );
}
