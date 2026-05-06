import { DocumentVault } from "@/components/document-vault";

export default async function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Mes documents</h1>
        <p className="mt-2 text-slate-600">Ajoutez et retrouvez vos justificatifs administratifs.</p>
      </div>
      <DocumentVault />
    </div>
  );
}
