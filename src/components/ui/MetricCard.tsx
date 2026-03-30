import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    subtitle?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    icon?: React.ReactNode;
    gradient?: 'ai' | 'manual' | 'success' | 'warning' | 'danger' | 'default';
    className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    suffix = '',
    prefix = '',
    decimals = 1,
    icon,
    trend,
    subtitle,
    gradient = 'default',
    className,
}) => {
    // Resilient component selection for the default export issue
    const CountUpComponent: any = (CountUp as any).default || CountUp;

    const gradients = {
        default: 'from-slate-50 to-white border-slate-200',
        ai: 'from-indigo-50/50 to-white border-indigo-100',
        success: 'from-emerald-50/50 to-white border-emerald-100',
        warning: 'from-amber-50/50 to-white border-amber-100',
        danger: 'from-rose-50/50 to-white border-rose-100',
        manual: 'from-slate-50 to-white border-slate-200',
    };

    return (
        <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={cn(
                "relative overflow-hidden rounded-3xl p-6 border bg-gradient-to-br shadow-sm transition-all",
                gradients[gradient as keyof typeof gradients] || gradients.default,
                className
            )}
        >
            {/* Ambient Background Glow */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-current opacity-[0.03] blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {icon && (
                        <div className={cn(
                            "p-2.5 rounded-2xl bg-white shadow-sm border border-slate-100 transition-transform hover:scale-110",
                            gradient === 'ai' ? 'text-indigo-600' :
                                gradient === 'success' ? 'text-emerald-600' :
                                    gradient === 'warning' ? 'text-amber-600' :
                                        gradient === 'danger' ? 'text-rose-600' : 'text-slate-600'
                        )}>
                            {icon}
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col justify-end">
                    <div className="flex items-end justify-between">
                        <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-4xl font-bold tracking-tight font-metric">
                                {prefix}
                                <CountUpComponent end={value} decimals={decimals} duration={2} separator="," />
                                {suffix}
                            </span>
                        </div>

                        {trend && (
                            <div className={cn(
                                "flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-black tracking-tight",
                                trend.isPositive
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                    : "bg-rose-50 text-rose-600 border border-rose-100"
                            )}>
                                {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}%
                            </div>
                        )}
                    </div>

                    {/* Progress Bar Placeholder for AI metrics */}
                    {gradient === 'ai' && (
                        <div className="mt-4 h-1 w-full bg-indigo-100/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-indigo-500 rounded-full"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Hover Arrow Decoration */}
            <div className="absolute bottom-4 right-4 translate-x-4 opacity-0 transition-all duration-300 pointer-events-none group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5 text-slate-300" />
            </div>
        </motion.div>
    );
};
