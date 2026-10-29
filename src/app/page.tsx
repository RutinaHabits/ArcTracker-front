"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import { useEffect, useRef } from "react";

import heroImg from "@/../public/images/heroImg.jpg";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    });

    const blocks = scrollRef.current?.querySelectorAll(`.${styles.reveal}`);
    blocks?.forEach((block) => observer.observe(block));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleVideoPlay = (event: Event) => {
      const playedVideo = event.target as HTMLVideoElement;
      const allVideos = container.querySelectorAll("video");

      allVideos.forEach((video) => {
        if (video !== playedVideo) {
          video.pause();
        }
      });
    };

    container.addEventListener("play", handleVideoPlay, true);

    return () => {
      container.removeEventListener("play", handleVideoPlay, true);
    };
  }, []);

  return (
    <div className={styles.container} ref={scrollRef}>
      <header className={styles.header}>
        <span className={styles.logo}>ARC.TRACKER</span>
        <div className={styles.auth}>
          <Link
            href="/sign-in"
            className={`${styles.link} ${styles.linkStick}`}
          >
            Sign In
          </Link>
          <Link href="/sign-up" className={styles.link}>
            Sign Up
          </Link>
        </div>
      </header>

      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.title} ${styles.reveal}`}>
            THE WINTER ARC <br />
            <span>HAS STARTED.</span>
          </h1>
          <p className={`${styles.subtitle} ${styles.reveal}`}>
            No excuses. No visibility. Just pure execution. Track your local
            habits and lock in global goals until the sun comes back.
          </p>
          <div className={`${styles.heroActions} ${styles.reveal}`}>
            <Link href="/sign-up" className={styles.primaryBtn}>
              Enter the Arc
            </Link>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <div className={styles.heroImageOverlay}></div>
          <div className={styles.heroImage}>
            <Image src={heroImg} alt="" className={styles.eyeIcon} />
          </div>
        </div>
      </main>

      <section className={styles.features}>
        <div className={`${styles.featureCard} ${styles.reveal}`}>
          <div className={styles.featureIcon}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
          </div>
          <h3>Local Habits</h3>
          <p>
            Daily, weekly, or custom routines mapped perfectly onto your
            seasonal calendar grid.
          </p>
        </div>
        <div className={`${styles.featureCard} ${styles.reveal}`}>
          <div className={styles.featureIcon}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <h3>Global Protocol</h3>
          <p>
            Set high-stakes milestones with strict deadliness. Failures
            instantly terminate your streak.
          </p>
        </div>
        <div className={`${styles.featureCard} ${styles.reveal}`}>
          <div className={styles.featureIcon}>
            <svg
              xmlns="http://w3.org"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
            >
              <path d="M13 2L4 14h8l-1 8 9-12h-8L13 2z" />
            </svg>
          </div>
          <h3>Optimistic Execution</h3>
          <p>
            Zero latency tracking. Check off tasks instantly with
            database-backed state memory.
          </p>
        </div>
      </section>

      <section className={styles.students}>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
          ARC DISCIPLES
        </h2>
        <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
          Real results from our elite performers locked in the protocol.
        </p>
        <div className={styles.videoGrid}>
          <div className={`${styles.videoCard} ${styles.reveal}`}>
            <div className={styles.videoWrapper}>
              <video
                src="https://ffxtjvwewjcfjyoy.private.blob.vercel-storage.com/1.mp4"
                controls
                playsInline
                loop
                muted
                preload="none"
                poster="images/preview/1.jpg"
              />
            </div>
            <div className={styles.videoMeta}>
              <span className={styles.author}>@yoannbeck</span>
              <span className={styles.badge}>Day 12/100</span>
            </div>
          </div>

          <div className={`${styles.videoCard} ${styles.reveal}`}>
            <div className={styles.videoWrapper}>
              <video
                src="https://ffxtjvwewjcfjyoy.private.blob.vercel-storage.com/2.mp4"
                controls
                playsInline
                loop
                muted
                preload="none"
                poster="images/preview/2.jpg"
              />
            </div>
            <div className={styles.videoMeta}>
              <span className={styles.author}>@ludanemartina</span>
              <span className={styles.badge}>Day 45/100</span>
            </div>
          </div>

          <div className={`${styles.videoCard} ${styles.reveal}`}>
            <div className={styles.videoWrapper}>
              <video
                src="https://ffxtjvwewjcfjyoy.private.blob.vercel-storage.com/3.mp4"
                controls
                playsInline
                loop
                muted
                preload="none"
                poster="images/preview/3.jpg"
              />
            </div>
            <div className={styles.videoMeta}>
              <span className={styles.author}>@bergist</span>
              <span className={styles.badge}>Day 89/100</span>
            </div>
          </div>
        </div>
        <div className={styles.disclaimerBox}>
          <p className={styles.disclaimerText}>
            The Arc Disciples section and videos are a{" "}
            <strong>gamified joke</strong> and <strong>meme</strong> inspired by
            fitness trends from social media. All authors featured in the videos
            are not real users of this application.
          </p>

          <p className={styles.disclaimerText}>
            <strong>Attention:</strong> The extreme routines and exercises shown
            in these videos are for entertainment purposes only.{" "}
            <strong>
              Do not attempt to repeat them without proper training and safety
              measures.
            </strong>
          </p>

          <p className={styles.disclaimerAction}>
            <span>Dear content authors:</span> If you see your video here and
            want it removed, just contact me through my Telegram channel:{" "}
            <a
              href="https://t.me/krylton"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.telegramLink}
            >
              krylton
            </a>
            . I will delete it instantly.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.disclaimer}>
          DISCLAIMER: This application is a self-improvement pet project built
          for extreme routine tracking optimization. The &quot;Winter Arc&quot;,
          &quot;Arc Disciples&quot;, and elite program references are gamified
          marketing jokes inspired by social media fitness trends. No real
          internet gurus were harmed in the making of this dashboard. Stay safe,
          touch grass, and execute sustainably.
        </p>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; 2026 ARC.TRACKER. All rights secured.
          </p>

          <div className={styles.credits}>
            <span>
              Design by{" "}
              <a
                href="https://figma.com/@uiux_dharmik"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dharmik Sutariya
              </a>
            </span>
            <span className={styles.separator}>•</span>
            <span>
              Icons by{" "}
              <a
                href="http://icons8.com/icons"
                target="_blank"
                rel="noopener noreferrer"
              >
                Icons8
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
