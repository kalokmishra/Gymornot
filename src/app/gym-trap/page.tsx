import Link from "next/link";
import { GYM_ITEMS } from "@/data/staticData";

export default function GymTrapPage() {
  return (
    <main className="min-h-screen w-full bg-void px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-sm font-bold text-ink">
            GymOrNot<span className="text-gym-green">.</span>com
          </Link>
          <Link
            href="/dont-wanna-gym"
            className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim hover:text-gym-green"
          >
            See the home setup instead →
          </Link>
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-gym-green">
          Route A — The Registry
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
          Read the contract before
          <br />
          it reads <span className="text-gym-green">you.</span>
        </h1>
        <p className="mt-4 max-w-2xl font-body text-ink-dim">
          Five major chains, laid out exactly as their cancellation desk
          would rather you not see it: true monthly cost, notice period,
          billing method, and the clause that keeps billing you anyway.
        </p>

        <div className="readout-rule mt-10" />

        {/* Desktop table */}
        <div className="mt-8 hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-hairline">
                <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                  Chain
                </th>
                <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                  True cost
                </th>
                <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                  Notice period
                </th>
                <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                  Billing method
                </th>
                <th className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                  Crowd peak
                </th>
                <th className="py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-alert">
                  The catch
                </th>
              </tr>
            </thead>
            <tbody>
              {GYM_ITEMS.map((gym) => (
                <tr
                  key={gym.id}
                  className="border-b border-hairline align-top hover:bg-surface/60"
                >
                  <td className="py-4 pr-4 font-display text-sm font-bold text-ink">
                    {gym.brandName}
                  </td>
                  <td className="py-4 pr-4 font-body text-sm text-ink-dim">
                    {gym.trueCost}
                  </td>
                  <td className="py-4 pr-4 font-body text-sm text-ink-dim">
                    {gym.noticePeriod}
                  </td>
                  <td className="py-4 pr-4 font-body text-sm text-ink-dim">
                    {gym.method}
                  </td>
                  <td className="py-4 pr-4 font-body text-sm text-ink-dim">
                    {gym.crowdPeak}
                  </td>
                  <td className="py-4 font-body text-sm text-alert/90">
                    {gym.catchClause}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / tablet stacked cards */}
        <div className="mt-8 flex flex-col gap-4 lg:hidden">
          {GYM_ITEMS.map((gym) => (
            <div
              key={gym.id}
              className="border border-hairline bg-surface p-5"
            >
              <h3 className="font-display text-lg font-bold text-ink">
                {gym.brandName}
              </h3>
              <dl className="mt-4 flex flex-col gap-3">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                    True cost
                  </dt>
                  <dd className="mt-1 font-body text-sm text-ink">
                    {gym.trueCost}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                    Notice period
                  </dt>
                  <dd className="mt-1 font-body text-sm text-ink">
                    {gym.noticePeriod}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                    Billing method
                  </dt>
                  <dd className="mt-1 font-body text-sm text-ink">
                    {gym.method}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                    Crowd peak
                  </dt>
                  <dd className="mt-1 font-body text-sm text-ink">
                    {gym.crowdPeak}
                  </dd>
                </div>
                <div className="border-t border-hairline pt-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-alert">
                    The catch
                  </dt>
                  <dd className="mt-1 font-body text-sm text-alert/90">
                    {gym.catchClause}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] text-ink-dim">
          Sourced from publicly posted membership terms. Terms change — read
          the agreement you're actually being handed before you sign it.
        </p>
      </div>
    </main>
  );
}
