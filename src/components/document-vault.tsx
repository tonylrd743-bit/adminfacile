"use client";

import { FolderLock, Upload } from "lucide-react";
import { Button } from "@/components/button";

export function DocumentVault() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <FolderLock className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase text-blue-600">Coffre-fort documents</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">Bientôt disponible</h2>
            <p className="mt-2 max-w-2xl leading-7 text-slate-600">
              Le coffre-fort sera activé après configuration complète du bucket Supabase Storage. Cette section ne bloque
              pas la génération de dossiers, l'historique ou l'export PDF.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h3 className="font-semibold text-slate-950">Aucun document enregistré pour le moment</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Vous pouvez continuer à préparer vos démarches et télécharger les PDF générés depuis le dashboard.
          </p>
        </div>
        <Button disabled type="button" variant="outline">
          <Upload className="h-4 w-4" />
          Upload bientôt disponible
        </Button>
      </div>
    </section>
  );
}
