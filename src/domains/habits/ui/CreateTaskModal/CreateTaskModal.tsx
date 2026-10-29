"use client";

import React, { useState, useEffect } from "react";
import { useCreateTask } from "../../hooks/useCreateTask";
import { FrequencyType, TaskType } from "../../model/types";
import styles from "./CreateTaskModal.module.scss";
import { Button } from "@/shared/ui/Button/Button";

interface CreateTaskModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAYS_OF_WEEK = [
  { id: 1, name: "Mon" },
  { id: 2, name: "Tue" },
  { id: 3, name: "Wed" },
  { id: 4, name: "Thu" },
  { id: 5, name: "Fri" },
  { id: 6, name: "Sat" },
  { id: 7, name: "Sun" },
];

export function CreateTaskModel({ isOpen, onClose }: CreateTaskModelProps) {
  const createTaskMutation = useCreateTask();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<TaskType>("LOCAL");
  const [isStrictMode, setIsStrictMode] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [frequency, setFrequency] = useState<FrequencyType>("DAILY");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDays.length > 0) {
      setError(null);
    }
  }, [selectedDays]);

  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString("sv-SE");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (
      type === "LOCAL" &&
      frequency === "CUSTOM" &&
      selectedDays.length === 0
    ) {
      setError("Please select at least one day for custom frequency.");
      return;
    }

    const payload: any = {
      title: title.trim(),
      type,
      is_strict_mode: isStrictMode,
    };

    if (type === "LOCAL") {
      payload.frequency = frequency;
      payload.custom_days =
        frequency === "CUSTOM"
          ? selectedDays.filter((day): day is number => typeof day === "number")
          : [];
      payload.deadline = null;
    } else {
      payload.frequency = "ONCE";
      payload.custom_days = [];
      payload.deadline = deadline
        ? new Date(`${deadline}T00:00:00`).toISOString()
        : null;
    }

    createTaskMutation.mutate(payload, {
      onSuccess: () => {
        setTitle("");
        setIsStrictMode(false);
        setDeadline("");
        setSelectedDays([]);
        setError(null);
        onClose();
      },
    });
  };

  const toggleDay = (dayId: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId],
    );
  };

  const handleTypeChange = (newType: "LOCAL" | "GLOBAL") => {
    setType(newType);
    setError(null);
    if (newType === "GLOBAL") {
      setFrequency("ONCE");
    } else {
      setFrequency("DAILY");
    }
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(e.target.value as FrequencyType);
    setError(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setError(null);
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.addTaskHeader}>Add task</h2>
          <button
            type="button"
            className={styles.closeCross}
            onClick={() => {
              setError(null);
              onClose();
            }}
            aria-label="Закрыть"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.fieldLabel}>
            Name of the habit / goal
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="For example: 15 min workout"
              required
            />
          </label>

          <div className={styles.typeSelector}>
            <button
              type="button"
              className={`${styles.typeBtn} ${type === "LOCAL" ? styles.activeType : ""}`}
              onClick={() => handleTypeChange("LOCAL")}
            >
              Local (Regular)
            </button>
            <button
              type="button"
              className={`${styles.typeBtn} ${type === "GLOBAL" ? styles.activeType : ""}`}
              onClick={() => handleTypeChange("GLOBAL")}
            >
              Global goal
            </button>
          </div>

          <div className={styles.strictModeWrapper}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isStrictMode}
                onChange={(e) => setIsStrictMode(e.target.checked)}
              />
              <span>Strict mode</span>
            </label>

            <div className={styles.tooltipContainer} data-tooltip="true">
              <span className={styles.infoIcon}>ⓘ</span>
              <p className={styles.strictDescription}>
                The task will not be canceled. If you try to delete this task,
                your streak will reset!
              </p>
            </div>
          </div>

          {type === "LOCAL" ? (
            <>
              <label className={styles.fieldLabel}>
                Frequency
                <select value={frequency} onChange={handleFrequencyChange}>
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="CUSTOM">Custom days</option>
                </select>
              </label>

              {frequency === "CUSTOM" && (
                <div className={styles.customDaysWrapper}>
                  <p className={styles.customDaysTitle}>Repeat on:</p>
                  <div className={styles.daysGrid}>
                    {DAYS_OF_WEEK.map((day) => {
                      const isSelected = selectedDays.includes(day.id);
                      return (
                        <button
                          key={day.id}
                          type="button"
                          className={`${styles.dayCircleBtn} ${isSelected ? styles.activeDay : ""}`}
                          onClick={() => toggleDay(day.id)}
                        >
                          {day.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <label className={styles.fieldLabel}>
              Deadline
              <input
                type="date"
                value={deadline}
                min={todayStr}
                onChange={(e) => setDeadline(e.target.value)}
                required={type === "GLOBAL"}
              />
            </label>
          )}

          {error && (
            <div className={styles.errorBlock}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}
          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setError(null);
                onClose();
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={createTaskMutation.isPending}
              className={styles.submitBtn}
            >
              {createTaskMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
