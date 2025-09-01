import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Welcome to Booth Buddy
            </h1>
            <p className="mt-4 text-lg text-foreground/80 sm:text-xl">
              Your booth’s best friend! Manage inventory, track sales, and share
              products with ease.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="rounded-md bg-primary px-6 py-3 text-lg font-medium text-white hover:bg-secondary"
              >
                Get Started
              </Link>
              <Link
                href="/guest"
                className="rounded-md border border-primary px-6 py-3 text-lg font-medium text-primary hover:bg-primary hover:text-white"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl text-center">
            Why Choose Booth Buddy?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary">
                Inventory Management
              </h3>
              <p className="mt-2 text-foreground">
                Easily add, edit, and track your booth’s inventory on the go.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-secondary">
                Sales Tracking
              </h3>
              <p className="mt-2 text-foreground">
                Record sales and calculate fees instantly, even at the booth.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-warning">
                Share Products
              </h3>
              <p className="mt-2 text-foreground">
                Share product details to messaging apps or marketplaces with one
                tap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Colors Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl text-center">
            Test Our Styles
          </h2>
          <div className="mt-8 space-y-4 text-center">
            <p className="text-primary">
              Primary color (blue-500): Manage your booth effortlessly.
            </p>
            <p className="text-secondary">
              Secondary color (emerald-500): Success made simple.
            </p>
            <p className="text-error">
              Error color (rose-500): Something went wrong!
            </p>
            <p className="text-warning">
              Warning color (amber-500): Low stock alert!
            </p>
            <p className="text-foreground">Foreground: Default text color.</p>
            <p className="bg-background text-foreground">
              Background: Changes with light/dark mode.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
