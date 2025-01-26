'use client';

import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { ChartBarIcon, Book, Code, Settings, Wand2, Terminal, ArrowRight } from "lucide-react"
import D3BarChart from '@/app/_components/charts/d3-bar-chart';
import D3DonutChart from '@/app/_components/charts/d3-donut-chart';
import D3LineChart from '@/app/_components/charts/d3-line-chart';
import D3StackedBarChart from '@/app/_components/charts/d3-stacked-bar-chart';
import D3StreamChart from '@/app/_components/charts/d3-stream-chart';
import D3TreeMap from '@/app/_components/charts/d3-tree-map';
import Link from 'next/link';

// Define the type for navigation items
type NavItem = {
  title: string;
  href: string;
  icon: React.ForwardRefExoticComponent<any>;
  content?: React.ReactElement;
};

type Section = {
  title: string;
  items: NavItem[];
};

// Export the sections data for the sidebar to use
export const sections: Section[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/{locale}/docs',
        icon: Book,
        content: (
          <section id="introduction">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Introduction</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              Welcome to Canopy Charts documentation. This guide will help you get started with our powerful charting library
              that combines the flexibility of D3.js with the modern features of React.
            </p>
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Key Features</h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Interactive D3.js visualizations with React components</li>
                <li>Beautiful, customizable themes and vibes</li>
                <li>Responsive and accessible design</li>
                <li>Smooth animations and transitions</li>
                <li>TypeScript support</li>
              </ul>
            </div>
          </section>
        )
      },
      {
        title: 'Installation',
        href: '/{locale}/docs/installation',
        icon: Terminal,
        content: (
          <section id="installation">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Installation</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              Get started with Canopy Charts in your React project.
            </p>
            
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">npm</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>npm install canopy-charts d3</code>
              </pre>
              
              <h2 className="text-xl font-semibold tracking-tight mt-8">pnpm</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>pnpm add canopy-charts d3</code>
              </pre>
              
              <h2 className="text-xl font-semibold tracking-tight mt-8">yarn</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>yarn add canopy-charts d3</code>
              </pre>
            </div>
          </section>
        )
      },
      {
        title: 'Basic Usage',
        href: '/{locale}/docs/basic-usage',
        icon: Code,
        content: (
          <section id="basic-usage">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Basic Usage</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              Learn how to create your first chart with Canopy Charts.
            </p>
            
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">1. Import the components</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`import { BarChart } from 'canopy-charts';`}</code>
              </pre>
              
              <h2 className="text-xl font-semibold tracking-tight mt-8">2. Prepare your data</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`const data = [
  { category: 'A', value: 10 },
  { category: 'B', value: 20 },
  { category: 'C', value: 15 },
];`}</code>
              </pre>
              
              <h2 className="text-xl font-semibold tracking-tight mt-8">3. Create your chart</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`export default function MyChart() {
  return (
    <BarChart
      data={data}
      xAxis="category"
      yAxis="value"
      height={400}
      width={600}
    />
  );
}`}</code>
              </pre>
              
              <div className="mt-8 p-4 border rounded-lg bg-muted/50">
                <h3 className="text-lg font-semibold mb-2">Pro tip</h3>
                <p className="text-sm text-muted-foreground">
                  All Canopy Charts components are responsive by default. You can use relative units like percentages
                  for width and height to make your charts adapt to their container.
                </p>
              </div>
            </div>
          </section>
        )
      }
    ]
  },
  {
    title: 'Charts',
    items: [
      {
        title: 'TreeMap',
        href: '/{locale}/docs/treemap-chart',
        icon: ChartBarIcon,
        content: (
          <section id="treemap">
            <h1 className="text-3xl font-bold tracking-tight mb-8">TreeMap Chart</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              TreeMap charts are perfect for displaying hierarchical data structures where space efficiency is important.
            </p>
            
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Example</h2>
              <div className="p-6 border rounded-lg bg-card">
                <D3TreeMap
                  width={600}
                  height={400}
                  data={{
                    name: "root",
                    value: 120, // Sum of all children's values: 30 + 15 + 40 + 25 + 10
                    children: [
                      { name: "A", value: 30 },
                      { name: "B", value: 15 },
                      { name: "C", value: 40 },
                      { name: "D", value: 25 },
                      { name: "E", value: 10 },
                    ]
                  }}
                />
              </div>

              <h2 className="text-xl font-semibold tracking-tight mt-8">Usage</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`import { TreeMap } from 'canopy-charts';

const data = {
  name: "root",
  children: [
    { name: "A", value: 30 },
    { name: "B", value: 15 },
    { name: "C", value: 40 },
  ]
};

export default function MyTreeMap() {
  return (
    <TreeMap
      data={data}
      width={600}
      height={400}
    />
  );
}`}</code>
              </pre>
            </div>
          </section>
        )
      },
      {
        title: 'Bar Chart',
        href: '/{locale}/docs/bar-chart',
        icon: ChartBarIcon,
        content: (
          <section id="bar">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Bar Chart</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              Bar charts are one of the most common and effective ways to visualize categorical data.
            </p>
            
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Example</h2>
              <div className="p-6 border rounded-lg bg-card">
                <D3BarChart
                  width={600}
                  height={400}
                  data={[
                    { label: "A", value: 30 },
                    { label: "B", value: 15 },
                    { label: "C", value: 40 },
                    { label: "D", value: 25 },
                    { label: "E", value: 10 },
                  ]}
                />
              </div>

              <h2 className="text-xl font-semibold tracking-tight mt-8">Usage</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`import { BarChart } from 'canopy-charts';

const data = [
  { label: "A", value: 30 },
  { label: "B", value: 15 },
  { label: "C", value: 40 },
];

export default function MyBarChart() {
  return (
    <BarChart
      data={data}
      width={600}
      height={400}
    />
  );
}`}</code>
              </pre>
            </div>
          </section>
        )
      },
      {
        title: 'Line Chart',
        href: '/{locale}/docs/line-chart',
        icon: ChartBarIcon,
        content: (
          <section id="line">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Line Chart</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              Line charts are perfect for showing trends over time or continuous data.
            </p>
            
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Example</h2>
              <div className="p-6 border rounded-lg bg-card">
                <D3LineChart
                  data={[
                    { dataset1: 10, name: 'point1' },
                    { dataset1: 15, name: 'point2' },
                    { dataset1: 25, name: 'point3' },
                    { dataset1: 20, name: 'point4' },
                    { dataset1: 30, name: 'point5' },
                  ]}
                  datasets={['dataset1']}
                  lineColors={['#1A458E']}
                />
              </div>

              <h2 className="text-xl font-semibold tracking-tight mt-8">Usage</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`import { LineChart } from 'canopy-charts';

const data = [
  { dataset1: 10, name: 'point1' },
  { dataset1: 15, name: 'point2' },
  { dataset1: 25, name: 'point3' },
];

export default function MyLineChart() {
  return (
    <LineChart
      data={data}
      datasets={['dataset1']}
      lineColors={['#1A458E']}
    />
  );
}`}</code>
              </pre>
            </div>
          </section>
        )
      },
      {
        title: 'Donut Chart',
        href: '/{locale}/docs/donut-chart',
        icon: ChartBarIcon,
        content: (
          <section id="donut">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Donut Chart</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              Donut charts are great for showing part-to-whole relationships and proportions.
            </p>
            
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Example</h2>
              <div className="p-6 border rounded-lg bg-card">
                <D3DonutChart
                  width={400}
                  height={400}
                  data={[
                    { label: "A", value: 30 },
                    { label: "B", value: 15 },
                    { label: "C", value: 40 },
                    { label: "D", value: 25 },
                  ]}
                />
              </div>

              <h2 className="text-xl font-semibold tracking-tight mt-8">Usage</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`import { DonutChart } from 'canopy-charts';

const data = [
  { label: "A", value: 30 },
  { label: "B", value: 15 },
  { label: "C", value: 40 },
];

export default function MyDonutChart() {
  return (
    <DonutChart
      data={data}
      width={400}
      height={400}
    />
  );
}`}</code>
              </pre>
            </div>
          </section>
        )
      },
      {
        title: 'Stream Chart',
        href: '/{locale}/docs/stream-chart',
        icon: ChartBarIcon,
        content: (
          <section id="stream">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Stream Chart</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              Stream charts (also known as streamgraphs) are perfect for showing how multiple categories change over time.
            </p>
            
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Example</h2>
              <div className="p-6 border rounded-lg bg-card">
                <D3StreamChart
                  width={600}
                  height={400}
                  data={[
                    { date: new Date('2021-01'), A: 30, B: 15, C: 40 },
                    { date: new Date('2021-02'), A: 35, B: 20, C: 35 },
                    { date: new Date('2021-03'), A: 40, B: 25, C: 30 },
                    { date: new Date('2021-04'), A: 45, B: 30, C: 25 },
                  ]}
                />
              </div>

              <h2 className="text-xl font-semibold tracking-tight mt-8">Usage</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`import { StreamChart } from 'canopy-charts';

const data = [
  { date: new Date('2021-01'), A: 30, B: 15, C: 40 },
  { date: new Date('2021-02'), A: 35, B: 20, C: 35 },
  { date: new Date('2021-03'), A: 40, B: 25, C: 30 },
];

export default function MyStreamChart() {
  return (
    <StreamChart
      data={data}
      width={600}
      height={400}
    />
  );
}`}</code>
              </pre>
            </div>
          </section>
        )
      },
      {
        title: 'Stacked Bar Chart',
        href: '/{locale}/docs/stacked-bar-chart',
        icon: ChartBarIcon,
        content: (
          <section id="stacked-bar">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Stacked Bar Chart</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              Stacked bar charts are excellent for comparing totals while also showing the composition of each bar.
            </p>
            
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Example</h2>
              <div className="p-6 border rounded-lg bg-card">
                <D3StackedBarChart
                  width={600}
                  height={400}
                  data={[
                    { category: 'A', value1: 30, value2: 15, value3: 40 },
                    { category: 'B', value1: 35, value2: 20, value3: 35 },
                    { category: 'C', value1: 40, value2: 25, value3: 30 },
                  ]}
                />
              </div>

              <h2 className="text-xl font-semibold tracking-tight mt-8">Usage</h2>
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                <code>{`import { StackedBarChart } from 'canopy-charts';

const data = [
  { category: 'A', value1: 30, value2: 15, value3: 40 },
  { category: 'B', value1: 35, value2: 20, value3: 35 },
  { category: 'C', value1: 40, value2: 25, value3: 30 },
];

export default function MyStackedBarChart() {
  return (
    <StackedBarChart
      data={data}
      width={600}
      height={400}
    />
  );
}`}</code>
              </pre>
            </div>
          </section>
        )
      }
    ]
  },
  {
    title: 'Features',
    items: [
      {
        title: 'AI Chart Suggestions',
        href: '/{locale}/docs/ai-features',
        icon: Wand2
      }
    ]
  }
];

// Export the DocsPage component
export default function DocsPage() {
  const t = useTranslations('Docs');
  const pathname = usePathname();
  const { locale } = useParams();
  let currentContent: React.ReactElement | null = null;

  const sections: Section[] = [
    {
      title: t('getting-started.title'),
      items: [
        {
          title: t('getting-started.introduction.title'),
          href: '/{locale}/docs',
          icon: Book,
          content: (
            <section id="introduction">
              <h1 className="text-3xl font-bold tracking-tight mb-8">{t('getting-started.introduction.title')}</h1>
              <p className="leading-7 text-muted-foreground mb-4">
                {t('getting-started.introduction.welcome')}
              </p>
              <div className="my-6 space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">{t('getting-started.introduction.features.title')}</h2>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  {[
                    "Interactive D3.js visualizations with React components",
                    "Beautiful, customizable themes and vibes",
                    "Responsive and accessible design",
                    "Smooth animations and transitions",
                    "TypeScript support"
                  ].map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </section>
          )
        },
        {
          title: t('getting-started.installation.title'),
          href: '/{locale}/docs/installation',
          icon: Terminal,
          content: (
            <section id="installation">
              <h1 className="text-3xl font-bold tracking-tight mb-8">{t('getting-started.installation.title')}</h1>
              <p className="leading-7 text-muted-foreground mb-4">
                {t('getting-started.installation.description')}
              </p>
              <div className="my-6 space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">npm</h2>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  <code>npm install canopy-charts d3</code>
                </pre>
                
                <h2 className="text-xl font-semibold tracking-tight mt-8">pnpm</h2>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  <code>pnpm add canopy-charts d3</code>
                </pre>
                
                <h2 className="text-xl font-semibold tracking-tight mt-8">yarn</h2>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  <code>yarn add canopy-charts d3</code>
                </pre>
              </div>
            </section>
          )
        }
      ]
    },
    {
      title: t('charts.title'),
      items: [
        {
          title: t('charts.barChart.title'),
          href: '/{locale}/docs/bar-chart',
          icon: ChartBarIcon,
          content: (
            <section id="bar-chart">
              <h1 className="text-3xl font-bold tracking-tight mb-8">{t('charts.barChart.title')}</h1>
              <p className="leading-7 text-muted-foreground mb-4">
                {t('charts.barChart.description')}
              </p>
              <div className="my-6 space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">Example</h2>
                <div className="p-6 border rounded-lg bg-card">
                  <D3BarChart
                    width={600}
                    height={400}
                    data={[
                      { label: "A", value: 30 },
                      { label: "B", value: 15 },
                      { label: "C", value: 40 },
                      { label: "D", value: 25 },
                      { label: "E", value: 10 },
                    ]}
                  />
                </div>

                <h2 className="text-xl font-semibold tracking-tight mt-8">Usage</h2>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  <code>{`import { BarChart } from 'canopy-charts';

const data = [
  { label: "A", value: 30 },
  { label: "B", value: 15 },
  { label: "C", value: 40 },
];

export default function MyBarChart() {
  return (
    <BarChart
      data={data}
      width={600}
      height={400}
    />
  );
}`}</code>
                </pre>
              </div>
            </section>
          )
        },
        // Add other chart sections similarly
      ]
    }
  ];

  for (const section of sections) {
    for (const item of section.items) {
      if (item.href.replace('{locale}', locale as string) === pathname && item.content) {
        currentContent = item.content;
        break;
      }
    }
    if (currentContent) break;
  }

  return (
    <div className="relative w-full py-10 bg-background dark:bg-[#1B1B1B]">
      {/* Gradient fade effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent dark:from-[#1B1B1B] dark:via-[#1B1B1B] dark:to-[#1A1A1A] opacity-90" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <section className="relative">
            <div className="relative w-fit group isolate">
              {/* Main title glow */}
              <div className="absolute inset-0 -z-[1]">
                <div className="absolute inset-0 rounded-lg bg-green-500/0 group-hover:bg-green-500/8 blur-sm transition-all duration-300" />
                <div className="absolute -inset-1 rounded-lg bg-green-500/0 group-hover:bg-green-500/5 blur-md transition-all duration-300" />
                <div className="absolute -inset-2 rounded-lg bg-green-500/0 group-hover:bg-green-500/3 blur-lg transition-all duration-300" />
              </div>
              <h1 className="relative text-5xl md:text-6xl font-bold mb-8 py-2 transition-all duration-300 group-hover:text-green-500/90 [text-wrap:balance]">Introduction</h1>
            </div>
            <p className="relative text-lg text-muted-foreground mb-8">
              Canopy Charts is a collection of beautifully crafted, customizable D3.js chart components for React. Built with flexibility and developer experience in mind.
            </p>

            <div className="space-y-12">
              <div className="p-8 rounded-2xl bg-background/40 dark:bg-white/[0.03] backdrop-blur-[8px] backdrop-saturate-[180%] 
                border border-border/20 transition-all duration-300
                shadow-[0_4px_12px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)] 
                hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]
                hover:bg-background/50 dark:hover:bg-white/[0.04]">
                <div className="w-fit relative group isolate">
                  {/* Subtitle glow - more subtle */}
                  <div className="absolute inset-0 -z-[1]">
                    <div className="absolute inset-0 rounded-lg bg-green-500/0 group-hover:bg-green-500/5 blur-[2px] transition-all duration-300" />
                    <div className="absolute -inset-1 rounded-lg bg-green-500/0 group-hover:bg-green-500/3 blur-sm transition-all duration-300" />
                  </div>
                  <h2 className="relative text-2xl font-semibold mb-4 px-0 py-2 transition-all duration-300 group-hover:text-green-500/90">Component-First Philosophy</h2>
                </div>
                <p className="text-muted-foreground/90 leading-relaxed">
                  Instead of providing a monolithic charting library, Canopy Charts follows a component-first approach. Each chart is a standalone component that you can copy and paste into your project, giving you complete control over your visualization code.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-background/40 dark:bg-white/[0.03] backdrop-blur-[8px] backdrop-saturate-[180%] 
                border border-border/20 transition-all duration-300
                shadow-[0_4px_12px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)] 
                hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]
                hover:bg-background/50 dark:hover:bg-white/[0.04]">
                <div className="w-fit relative group isolate">
                  {/* Subtitle glow - more subtle */}
                  <div className="absolute inset-0 -z-[1]">
                    <div className="absolute inset-0 rounded-lg bg-green-500/0 group-hover:bg-green-500/5 blur-[2px] transition-all duration-300" />
                    <div className="absolute -inset-1 rounded-lg bg-green-500/0 group-hover:bg-green-500/3 blur-sm transition-all duration-300" />
                  </div>
                  <h2 className="relative text-2xl font-semibold mb-4 py-2 transition-all duration-300 group-hover:text-green-500/90">Why This Approach?</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 transition-colors hover:text-green-500/90">Complete Control & Understanding</h3>
                    <p className="text-muted-foreground/90 leading-relaxed">
                      Take full ownership of your visualization code. Modify, extend, and adapt components to your specific needs without limitations. Having the source code in your project helps you understand how the charts work and makes debugging straightforward.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 transition-colors hover:text-green-500/90">Optimized Performance</h3>
                    <p className="text-muted-foreground/90 leading-relaxed">
                      No external dependencies means a leaner bundle size. Only include the charts you actually use, keeping your application fast and efficient. No need to install and maintain additional packages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 transition-colors hover:text-green-500/90">Enhanced Security</h3>
                    <p className="text-muted-foreground/90 leading-relaxed">
                      Minimize security vulnerabilities by reducing external dependencies. You can audit and control all the code that runs in your application, eliminating potential supply chain attacks by removing the need to trust and maintain third-party packages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-background/40 dark:bg-white/[0.03] backdrop-blur-[8px] backdrop-saturate-[180%] 
                border border-border/20 transition-all duration-300
                shadow-[0_4px_12px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)] 
                hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]
                hover:bg-background/50 dark:hover:bg-white/[0.04]">
                <div className="w-fit relative group isolate">
                  {/* Subtitle glow - more subtle */}
                  <div className="absolute inset-0 -z-[1]">
                    <div className="absolute inset-0 rounded-lg bg-green-500/0 group-hover:bg-green-500/5 blur-[2px] transition-all duration-300" />
                    <div className="absolute -inset-1 rounded-lg bg-green-500/0 group-hover:bg-green-500/3 blur-sm transition-all duration-300" />
                  </div>
                  <h2 className="relative text-2xl font-semibold mb-4 py-2 transition-all duration-300 group-hover:text-green-500/90">Getting Started</h2>
                </div>
                <p className="text-muted-foreground/90 leading-relaxed mb-4">
                  Browse our collection of charts, find the one you need, and copy it into your project. Each component comes with clear documentation, TypeScript types, and customization options.
                </p>
                <div className="mt-4">
                  <Link href="/docs/installation" className="inline-flex items-center text-muted-foreground hover:text-green-500/90 transition-colors">
                    Installation guide <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
          {currentContent}
        </div>
      </div>
    </div>
  );
}

// Default export for the index route
export function DefaultDocsPage() {
  return <DocsPage />;
}
