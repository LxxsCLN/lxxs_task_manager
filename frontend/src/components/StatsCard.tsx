import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    bgColor: string;
}

export const StatsCard = ({ label, value, icon, bgColor }: StatsCardProps) => {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {label}
                        </p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                    <div
                        className={`h-8 w-8 ${bgColor} rounded-full flex items-center justify-center`}
                    >
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
