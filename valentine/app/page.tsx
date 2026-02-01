"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState({ top: "50%", left: "55%" });
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesSize, setYesSize] = useState(1);
  const [confetti, setConfetti] = useState([]);
  const [hearts, setHearts] = useState([]);

  // Messages that change as user clicks "No"
  const noMessages = [
    "Will you be my Valentine? 💖",
    "Are you sure? 🥺",
    "Really sure? 💔",
    "Please reconsider! 🙏",
    "Don't break my heart! 💘",
    "You're making me sad... 😢",
    "I'll give you chocolate! 🍫",
    "Pretty please? 🥹",
    "Think about it... 💭",
    "Last chance! ⭐",
  ];

  // Move No button and increase Yes button size
  const moveNo = () => {
    setNoPos({
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 70 + 10}%`,
    });
    setNoClickCount((prev) => Math.min(prev + 1, noMessages.length - 1));
    setYesSize((prev) => prev + 0.3);
  };

  // Generate confetti when Yes is clicked
  const handleYesClick = () => {
    setYesClicked(true);
    generateConfetti();
  };

  const generateConfetti = () => {
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: ["#ff4d6d", "#ff69b4", "#ffc0cb", "#ff1493", "#ffb6c1"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setConfetti(newConfetti);
  };

  // Generate floating hearts periodically
  useEffect(() => {
    if (yesClicked) {
      const interval = setInterval(() => {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100,
        };
        setHearts((prev) => [...prev, newHeart]);
        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 4000);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [yesClicked]);

  return (
    <div style={styles.container}>
      {/* Names at the top */}
      <div style={styles.namesContainer}>
        <span style={styles.name}>Siddharth</span>
        <span style={styles.heartBetween}>💕</span>
        <span style={styles.name}>Amirtha</span>
      </div>

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          style={{
            ...styles.confetti,
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: piece.color,
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            ...styles.floatingHeart,
            left: `${heart.left}%`,
          }}
        >
          ❤️
        </div>
      ))}

      {!yesClicked ? (
        <>
          <h1 style={styles.text}>{noMessages[noClickCount]}</h1>

          {noClickCount > 3 && (
            <p style={styles.subtitle}>
              The "Yes" button is getting bigger... 👀
            </p>
          )}

          <div style={styles.buttons}>
            <button
              style={{
                ...styles.yes,
                transform: `scale(${yesSize})`,
                transition: "transform 0.3s ease",
              }}
              onClick={handleYesClick}
            >
              Yes 😍
            </button>

            <button
              style={{
                ...styles.no,
                top: noPos.top,
                left: noPos.left,
                fontSize: `${Math.max(18 - noClickCount, 10)}px`,
              }}
              onMouseEnter={moveNo}
              onClick={moveNo}
            >
              No 🙃
            </button>
          </div>

          {noClickCount > 5 && (
            <p style={styles.hint}>
              💡 Hint: The "No" button keeps running away!
            </p>
          )}
        </>
      ) : (
        <div style={styles.successContainer}>
          <h1 style={{ ...styles.text, animation: "bounce 1s ease infinite" }}>
            Yayyy!!! 💕
          </h1>
          
          <img
            src="https://media.giphy.com/media/g9582DNuQppxC/giphy.gif"
            alt="Happy celebration"
            style={styles.celebrationGif}
          />
          
          <div style={styles.coupleNames}>
            <span style={styles.successName}>Siddharth</span>
            <span style={styles.andSymbol}>&</span>
            <span style={styles.successName}>Amirtha</span>
          </div>
          
          <h2 style={styles.subtitle}>Forever & Always ❤️</h2>
          <div style={styles.celebration}>
            <span style={styles.emoji}>🎉</span>
            <span style={styles.emoji}>💖</span>
            <span style={styles.emoji}>✨</span>
            <span style={styles.emoji}>🥰</span>
            <span style={styles.emoji}>🎊</span>
          </div>
          <p style={styles.dateIdea}>
            Let's plan our perfect date! 🌹
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "cursive",
    overflow: "hidden",
    position: "relative",
  },
  namesContainer: {
    position: "absolute",
    top: "30px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    animation: "pulse 2s ease infinite",
  },
  name: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
    padding: "10px 20px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
  },
  heartBetween: {
    fontSize: "2.5rem",
    animation: "pulse 1.5s ease infinite",
    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
  },
  coupleNames: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "10px",
  },
  successName: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#ff4d6d",
    textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "10px 25px",
    borderRadius: "20px",
    border: "3px solid #ff4d6d",
  },
  andSymbol: {
    fontSize: "2rem",
    color: "#fff",
    fontStyle: "italic",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  text: {
    fontSize: "3rem",
    color: "#fff",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    margin: "20px",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#fff",
    textAlign: "center",
    margin: "10px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  },
  buttons: {
    marginTop: "30px",
    position: "relative",
    height: "200px",
    width: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  yes: {
    padding: "15px 30px",
    fontSize: "18px",
    background: "#ff4d6d",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 77, 109, 0.4)",
    fontWeight: "bold",
    zIndex: 10,
  },
  no: {
    position: "absolute",
    padding: "15px 30px",
    fontSize: "18px",
    background: "#fff",
    color: "#ff4d6d",
    border: "2px solid #ff4d6d",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "bold",
  },
  hint: {
    fontSize: "1rem",
    color: "#fff",
    marginTop: "20px",
    fontStyle: "italic",
  },
  confetti: {
    position: "absolute",
    width: "10px",
    height: "10px",
    top: "-10px",
    animation: "fall 3s linear forwards",
    zIndex: 1000,
  },
  floatingHeart: {
    position: "absolute",
    fontSize: "2rem",
    bottom: "-50px",
    animation: "float 4s ease-in forwards",
    zIndex: 999,
  },
  celebrationGif: {
    width: "300px",
    height: "300px",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(255, 77, 109, 0.3)",
    marginBottom: "20px",
    border: "5px solid #fff",
    objectFit: "cover",
  },
  successContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  celebration: {
    display: "flex",
    gap: "20px",
    fontSize: "3rem",
    marginTop: "20px",
  },
  emoji: {
    display: "inline-block",
    animation: "pulse 1s ease infinite",
  },
  dateIdea: {
    fontSize: "1.3rem",
    color: "#fff",
    marginTop: "30px",
    padding: "15px 30px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
  },
};
