"use client";

import { TaskCard } from "@/domains/habits/ui/TaskCard/TaskCard";
import styles from "./HabitTracker.module.scss";
import { useUserProgress } from "../../../profile/hooks/useUserProgress";
import { useToggleTask } from "../../hooks/useToggleTask";
import { useEffect, useMemo, useState } from "react";
import { CalendarStrip } from "@/shared/ui/CalendarStrip/CalendarStrip";
import { CreateTaskModel } from "../CreateTaskModal/CreateTaskModal";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import { useLocalTasks } from "../../hooks/useLocalTasks";
import { useGlobalTasks } from "../../hooks/useGlobalTasks";
import { Task } from "../../model/types";
import { Button } from "@/shared/ui/Button/Button";
import { store, useAppDispatch, useAppSelector } from "@/store";
import {
  selectFilteredLocalTasks,
  setGlobalSearch,
  setLocalSearch,
  setSelectedDate,
} from "../../model/habitSlice";

export function HabitTracker() {
  const dispatch = useAppDispatch();

  const selectedDate = useAppSelector((store) => store.habits.selectedDate);
  const localSearch = useAppSelector((store) => store.habits.localSearch);
  const globalSearch = useAppSelector((store) => store.habits.globalSearch);
  const storeState = useAppSelector((store) => store);

  const [debouncedDate, setDebouncedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("LOCAL");

  const [isMounted, setIsMounted] = useState(false);
  const [todayIso, setTodayIso] = useState("");

  useEffect(() => {
    const clientTodayIso = new Date().toLocaleDateString("sv-SE");
    setTodayIso(clientTodayIso);
    setDebouncedDate(clientTodayIso);

    if (!selectedDate) {
      dispatch(setSelectedDate(clientTodayIso));
    }

    setIsMounted(true);
  }, [dispatch, selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;

    const handler = setTimeout(() => {
      setDebouncedDate(selectedDate);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [selectedDate]);

  const { data: userProgress } = useUserProgress();
  const { data: localTasks = [], isLoading: isLocalLoading } =
    useLocalTasks(debouncedDate);
  const { data: globalTasks = [], isLoading: isGlobalLoading } =
    useGlobalTasks();

  const toggleTaskMutation = useToggleTask();
  const deleteTaskMutation = useDeleteTask();

  const filteredLocalTasks = selectFilteredLocalTasks(storeState, localTasks);
  const filteredGlobalTasks = selectFilteredLocalTasks(storeState, globalTasks);

  const isDateChanging = selectedDate !== debouncedDate;
  const showLocalLoading = isLocalLoading || isDateChanging;

  const isStreakActive = Boolean(userProgress?.isTodayCompleted);
  const isPastDay = selectedDate < todayIso;

  const handleToggle = (id: string, currentStatus: string) => {
    toggleTaskMutation.mutate({ id, date: debouncedDate, currentStatus });
  };

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate({
      id: id,
      date: debouncedDate,
    });
  };

  const renderSkeletons = () => (
    <div className={styles.taskList}>
      <div className={`${styles.cardSkeleton} ${styles.skeletonAnim}`}></div>
      <div className={`${styles.cardSkeleton} ${styles.skeletonAnim}`}></div>
    </div>
  );

  if (!isMounted) {
    return <div className={styles.loading}>Application initialization...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <p className={styles.streakInfo}>
            <span
              className={`${styles.fireIcon} ${!isStreakActive ? styles.inactiveFire : ""}`}
            >
              🔥
            </span>
            Current streak:{" "}
            <span className={styles.streakCount}>
              {userProgress?.currentStreak || 0} days
            </span>{" "}
            <span className={styles.separator}>|</span>
            Best streak:
            <span className={styles.streakCount}>
              {userProgress?.bestStreak || 0}{" "}
              {userProgress?.bestStreak === 1 ? "day" : "days"}
            </span>
          </p>
        </div>

        <Button
          className={styles.addBtn}
          variant="primary"
          onClick={() => {
            dispatch(setLocalSearch(""));
            dispatch(setGlobalSearch(""));
            setIsModalOpen(true);
          }}
        >
          <span className={styles.btnIcon}>+</span> Add task
        </Button>
      </header>

      <CalendarStrip
        selectedDate={selectedDate}
        onSelectDate={(newDate) => dispatch(setSelectedDate(newDate))}
      />

      <div className={styles.mobileTabs}>
        <button
          className={`${styles.tabButton} ${activeTab === "LOCAL" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("LOCAL")}
        >
          Local <span className={styles.tabCount}>{localTasks.length}</span>
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "GLOBAL" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("GLOBAL")}
        >
          Global <span className={styles.tabCount}>{globalTasks.length}</span>
        </button>
      </div>

      <div className={styles.grid}>
        {/* LOCAL COLUMN */}
        <section
          className={`${styles.column} ${activeTab === "LOCAL" ? styles.showMobileColumn : styles.hideMobileColumn}`}
        >
          <div className={styles.columnHeader}>
            <h2 className={styles.columnTitle}>Local</h2>
            {!showLocalLoading && (
              <span className={styles.columnCount}>{localTasks.length}</span>
            )}
          </div>

          {(localTasks.length > 0 || localSearch.trim() !== "") && (
            <input
              type="text"
              placeholder="Search local tasks..."
              className={styles.searchInput}
              value={localSearch}
              onChange={(e) => dispatch(setLocalSearch(e.target.value))}
            />
          )}

          {showLocalLoading ? (
            renderSkeletons()
          ) : localTasks.length === 0 ? (
            <div className={styles.emptyState}>
              You don't have regular habits yet
            </div>
          ) : (
            <div className={styles.taskList}>
              {filteredLocalTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isPastDay={isPastDay}
                  searchQuery={localSearch}
                  onToggle={() =>
                    handleToggle(task.id, task.log?.status || "PENDING")
                  }
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        {/* GLOBAL COLUMN */}
        <section
          className={`${styles.column} ${activeTab === "GLOBAL" ? styles.showMobileColumn : styles.hideMobileColumn}`}
        >
          <div className={styles.columnHeader}>
            <h2 className={styles.columnTitle}>Global</h2>
            {!isGlobalLoading && (
              <span className={styles.columnCount}>{globalTasks.length}</span>
            )}
          </div>

          {(globalTasks.length > 0 || globalSearch.trim() !== "") && (
            <input
              type="text"
              placeholder="Search global goals..."
              className={styles.searchInput}
              value={globalSearch}
              onChange={(e) => dispatch(setGlobalSearch(e.target.value))}
            />
          )}

          {isGlobalLoading ? (
            renderSkeletons()
          ) : globalTasks.length === 0 ? (
            <div className={styles.emptyState}>
              The list of global goals is empty
            </div>
          ) : (
            <div className={styles.taskList}>
              {filteredGlobalTasks.map((task: Task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  searchQuery={localSearch}
                  onToggle={() =>
                    handleToggle(task.id, task.log?.status || "PENDING")
                  }
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <CreateTaskModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
