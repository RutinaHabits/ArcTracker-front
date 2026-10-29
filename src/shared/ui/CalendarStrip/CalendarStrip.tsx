import { useEffect, useMemo, useRef } from "react";
import styles from "./CalendarStrip.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";

interface Day {
  dateString: string;
  weekday: string;
  dayNum: string;
  monthLabel: string;
}

interface CalendarStripProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateStr: string) => void;
}

const CARD_WIDTH = 60;
const CARD_GAP = 8;
const SCROLL_STEP = 3;

export function CalendarStrip({
  selectedDate,
  onSelectDate,
}: CalendarStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const days: Day[] = useMemo(() => {
    const result: Day[] = [];
    const start = new Date();
    start.setDate(start.getDate() - 180);

    const formatterWeek = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
    });
    const formatterDay = new Intl.DateTimeFormat("en-GB", { day: "numeric" });
    const formatterMonth = new Intl.DateTimeFormat("en-GB", { month: "short" });

    for (let i = 0; i < 365; i++) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);

      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, "0");
      const day = String(current.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      result.push({
        dateString,
        weekday: formatterWeek.format(current),
        dayNum: formatterDay.format(current),
        monthLabel: formatterMonth.format(current),
      });
    }
    return result;
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector(
        `.${styles.active}`,
      ) as HTMLElement;

      if (activeElement) {
        containerRef.current.scrollTo({
          left:
            activeElement.offsetLeft -
            containerRef.current.offsetWidth / 2 +
            activeElement.offsetWidth / 2,
          behavior: "instant",
        });
      }
    }
  }, []);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const offset = (CARD_WIDTH + CARD_GAP) * SCROLL_STEP;
      containerRef.current.scrollBy({ left: -offset, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const offset = (CARD_WIDTH + CARD_GAP) * SCROLL_STEP;
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={`${styles.arrowWrapper} ${styles.leftArrowWrapper}`}>
        <button
          className={styles.arrowButton}
          onClick={handleScrollLeft}
          aria-label="Назад"
        >
          ‹
        </button>
      </div>

      <ScrollContainer
        innerRef={containerRef}
        className={styles.scrollWrapper}
        nativeMobileScroll={true}
        hideScrollbars={true}
      >
        {days.map((day) => {
          const isSelected = day.dateString === selectedDate;
          const isToday =
            day.dateString === new Date().toLocaleDateString("sv-SE");

          return (
            <button
              key={day.dateString}
              className={`${styles.dayCard} ${isSelected ? styles.active : ""} ${isToday ? styles.today : ""}`}
              onClick={() => onSelectDate(day.dateString)}
            >
              <span className={styles.month}>
                {isToday ? "TODAY" : day.monthLabel}
              </span>
              <span className={styles.dayNumber}>{day.dayNum}</span>
              <span className={styles.weekday}>{day.weekday}</span>
            </button>
          );
        })}
      </ScrollContainer>

      <div className={`${styles.arrowWrapper} ${styles.rightArrowWrapper}`}>
        <button
          className={styles.arrowButton}
          onClick={handleScrollRight}
          aria-label="Вперед"
        >
          ›
        </button>
      </div>
    </div>
  );
}
