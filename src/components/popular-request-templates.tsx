"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button, ButtonLink } from "@/components/button";
import { popularRequestCategories, popularRequestTemplates } from "@/data/popular-requests";
import type { PopularRequestTemplate } from "@/data/popular-requests";

export function PopularRequestTemplates({
  onSelect,
  compact = false
}: {
  onSelect?: (template: PopularRequestTemplate) => void;
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return popularRequestTemplates.filter((template) => {
      const matchesCategory = category === "Toutes" || template.category === category;
      const searchable = `${template.title} ${template.category} ${template.description} ${template.badge ?? ""}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, query]);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">Demandes populaires</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Demandes populaires</h2>
          <p className="mt-2 max-w-3xl leading-7 text-slate-600">
            Choisissez un modèle, complétez les informations entre parenthèses, puis générez votre dossier.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_220px] lg:min-w-[520px]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="min-h-11 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un modèle"
              value={query}
            />
          </label>
          <select
            className="min-h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            <option>Toutes</option>
            {popularRequestCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={compact ? "mt-6 grid gap-4 md:grid-cols-2" : "mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
        {filteredTemplates.map((template) => (
          <article className="flex min-w-0 flex-col rounded-3xl border border-slate-200 bg-slate-50 p-4" key={template.id}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                {template.category}
              </span>
              {template.badge ? (
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">{template.badge}</span>
              ) : null}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-950">{template.title}</h3>
            <p className="mt-2 flex-1 leading-7 text-slate-600">{template.description}</p>
            <div className="mt-4 rounded-2xl bg-white p-3 text-sm leading-6 text-slate-600 ring-1 ring-slate-200">
              {template.promptTemplate.split("\n").slice(0, 3).join(" ")}
            </div>
            <div className="mt-4">
              {onSelect ? (
                <Button className="w-full" onClick={() => onSelect(template)} type="button">
                  <Sparkles className="h-4 w-4" />
                  Utiliser ce modèle
                </Button>
              ) : (
                <ButtonLink className="w-full" href={`/dashboard/new?template=${template.id}`}>
                  <Sparkles className="h-4 w-4" />
                  Utiliser ce modèle
                </ButtonLink>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredTemplates.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Aucun modèle ne correspond à votre recherche.
        </p>
      ) : null}
    </section>
  );
}
