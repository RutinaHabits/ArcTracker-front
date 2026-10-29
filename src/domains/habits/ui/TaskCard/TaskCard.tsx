import { Task } from "../../model/types";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isPastDay?: boolean;
  searchQuery?: string;
}

export function TaskCard({
  task,
  onToggle,
  onDelete,
  isPastDay = false,
  searchQuery = "",
}: TaskCardProps) {
  const currentStatus = task.log?.status || "PENDING";
  const isCompleted = currentStatus === "COMPLETED";
  const isStrict = task.is_strict_mode;

  function HighlightedText({
    text,
    highlight,
  }: {
    text: string;
    highlight: string;
  }) {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }

    const regex = new RegExp(
      `(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className={styles.highlight}>
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </span>
    );
  }

  return (
    <div
      className={`${styles.card} ${isCompleted ? styles.completed : ""} ${isStrict ? styles.strict : ""}`}
    >
      <button
        className={`${styles.deleteBtn} ${isStrict ? styles.deleteBtnStrict : styles.deleteBtnDef}`}
        onClick={() => onDelete(task.id)}
        title={isPastDay ? "Delete this instance" : "Delete task globally"}
      >
        &times;
      </button>
      <div className={styles.info}>
        <div className={styles.title}>
          <HighlightedText text={task.title} highlight={searchQuery || ""} />
        </div>
        {task.is_strict_mode && (
          <span className={styles.strictBadge}>Strict</span>
        )}
        {task.deadline && (
          <span className={styles.deadline}>
            Until: {new Date(task.deadline).toLocaleDateString()}
          </span>
        )}
      </div>

      <button
        className={`${styles.checkbox} ${isCompleted ? styles.checked : ""} ${isPastDay ? styles.disabledCheckbox : ""}`}
        onClick={() => !isPastDay && onToggle(task.id)}
        disabled={isPastDay}
        aria-label={isCompleted ? "Mark as uncompleted" : "Mark as completed"}
      >
        <span className={styles.checkmark}></span>
      </button>
    </div>
  );
}
