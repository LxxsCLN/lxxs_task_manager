import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "i18next";

const statusColors: any = {
    pending: "bg-gray-100 text-gray-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
};

const priorityColors: any = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-blue-100 text-blue-600",
    high: "bg-orange-100 text-orange-600",
    urgent: "bg-red-100 text-red-600",
};

export const TaskCard = ({ task }: { task: any }) => {
    return (
        <Card className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-102 hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">
                        {task.title}
                    </CardTitle>
                    <Badge className={priorityColors[task.priority]}>
                        {t(`home.${task.priority}`)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {task.description}
                </p>

                <div className="flex items-center justify-between">
                    <Badge className={statusColors[task.status]}>
                        {t(`home.${task.status}`)}
                    </Badge>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage
                                src={"/placeholder.png"}
                                alt={task?.name}
                            />
                        </Avatar>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {task?.name}
                        </span>
                    </div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>
                        {task?.completed_at && (
                            <span>
                                {t("home.completed")}:{" "}
                                {new Date(
                                    task.completed_at
                                ).toLocaleDateString()}
                            </span>
                        )}
                    </span>
                    <span>
                        {t("home.created")}:{" "}
                        {new Date(task.created_at).toLocaleDateString("es-ES")}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
