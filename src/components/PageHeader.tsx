import Image from "next/image";

export default function PageHeader() {
  return (
    <div className="text-center flex flex-col gap-1 items-center my-8 sm:my-12">
      <div className="flex items-center  gap-2">
        <Image src="/aynia.png" width="36" height="36" alt="" />
        <h1 className="text-3xl sm:text-4xl font-bold">Aynia</h1>
      </div>
      <p className="text-slate-300 mt-2">
        Tu guía para acompañar las emociones de los más pequeños.
      </p>
    </div>
  );
}
