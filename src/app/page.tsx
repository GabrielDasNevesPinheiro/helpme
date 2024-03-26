import AppBar from "@/components/layout/AppBar";
import MainLayout from "@/components/layout/MainLayout";
import ProfileWidget from "@/components/widgets/profileWidget/ProfileWidget";
import { Suspense } from 'react';
import Connection from '../components/ui/connection';


export default function Home() {


  return (
    <MainLayout>
      <AppBar />
      <div className="flex flex-col md:flex-row justify-between p-12 gap-y-4 md:gap-y-0">
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileWidget />
        </Suspense>
        <Connection />
      </div>
      <div className="flex flex-col items-center justify-center text-2xl h-max">
        <h1>Se você passou aqui para ver do que se trata a aplicação, relaxe, ela está passando por um rework 🔥</h1>
        <h1>Logo, a interface estará linda(eu acredito), a aplicação escalável e perfeita para uso.</h1>
        <h1>Atenciosamente,
          <a href="https://github.com/gabrieldasnevespinheiro" className="text-purple-500 hover:bg-white/10 rounded-md transition-colors"> Gabriel das Neves Pinheiro.</a>
        </h1>
      </div>
    </MainLayout>
  )
}
