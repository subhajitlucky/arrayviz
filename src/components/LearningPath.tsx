import { BookOpen, Code2, Layers, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LearningPath() {
    const steps = [
        {
            id: 1,
            title: "The Basics",
            desc: "Memory layout & Indexing",
            icon: <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
            color: "bg-blue-100 dark:bg-blue-900/30",
            link: "#definition"
        },
        {
            id: 2,
            title: "Operations",
            desc: "Insert, Delete, Search",
            icon: <Code2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
            color: "bg-orange-100 dark:bg-orange-900/30",
            link: "#operations"
        },
        {
            id: 3,
            title: "Advanced",
            desc: "Dynamic & 2D Arrays",
            icon: <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
            color: "bg-purple-100 dark:bg-purple-900/30",
            link: "#dynamic"
        },
        {
            id: 4,
            title: "Patterns",
            desc: "Master 21 Algorithms",
            icon: <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />,
            color: "bg-green-100 dark:bg-green-900/30",
            link: "/patterns"
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Path to Mastery</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Follow this roadmap to become an array expert.</p>
                </div>
            </div>

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                    {steps.map((step, idx) => (
                        <a
                            key={step.id}
                            href={step.link.startsWith('#') ? step.link : undefined}
                            className="group block"
                        >
                            {step.link.startsWith('/') ? (
                                <Link to={step.link} className="block h-full">
                                    <StepContent step={step} idx={idx} total={steps.length} />
                                </Link>
                            ) : (
                                <div className="block h-full">
                                    <StepContent step={step} idx={idx} total={steps.length} />
                                </div>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StepContent({ step, idx, total }: { step: any, idx: number, total: number }) {
    return (
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-4 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer h-full flex flex-col items-center text-center md:items-start md:text-left group-hover:shadow-md">
            <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {step.icon}
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                {step.title}
                {idx < total - 1 && <ArrowRight className="w-4 h-4 text-slate-300 md:hidden" />}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{step.desc}</p>
        </div>
    );
}
