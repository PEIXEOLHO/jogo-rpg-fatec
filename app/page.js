"use client"; 

import { useState } from "react";
import Character from "./components/character"; 

export default function Home() {
  const [heroLife, setHeroLife] = useState(100);
  const [villainLife, setVillainLife] = useState(100);
  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [gameLog, setGameLog] = useState("O combate começou! É a sua vez.");
  const [isHeroDefending, setIsHeroDefending] = useState(false);

  const heroData = { name: "Guerreiro", life: heroLife };
  const villainData = { name: "Mercenário", life: villainLife };

  const executeVillainTurn = (currentDefense) => {
    setTimeout(() => {
      if (villainLife <= 0) return;

      const iaChoice = Math.random() > 0.25 ? "attack" : "heal";

      if (iaChoice === "attack") {
        const damageBase = Math.floor(Math.random() * 16) + 10;
        const finalDamage = currentDefense ? Math.floor(damageBase / 2) : damageBase;

        if (currentDefense) {
          setGameLog(`Você defendeu! O Mercenário causou apenas ${finalDamage} de dano.`);
        } else {
          setGameLog(`O Mercenário contra-atacou e causou ${finalDamage} de dano!`);
        }

        setHeroLife((prev) => Math.max(0, prev - finalDamage));
      } else {
        const healAmount = 15;
        setGameLog(`O Mercenário usou uma bandagem e recuperou ${healAmount} de vida.`);
        
        setVillainLife((prev) => Math.min(100, prev + healAmount));
      }

      setIsHeroDefending(false); 
      setIsHeroTurn(true);
    }, 1000);
  };

  const handleHeroAction = (action) => {
    if (!isHeroTurn || heroLife <= 0 || villainLife <= 0) return;

    setIsHeroTurn(false); 

    if (action === "attack") {
      const damage = Math.floor(Math.random() * 21); 
      setGameLog(`Você atacou o Mercenário e causou ${damage} de dano!`);
      
      const nextVillainLife = Math.max(0, villainLife - damage);
      setVillainLife(nextVillainLife);

      if (nextVillainLife <= 0) {
        setGameLog("Vitória! O Mercenário foi derrotado! 🎉");
        return;
      }

      executeVillainTurn(isHeroDefending);

    } else if (action === "defense") {
      setIsHeroDefending(true);
      setGameLog("Você entrou em postura defensiva! O próximo dano será reduzido.");
      executeVillainTurn(true);

    } else if (action === "usePotion") {
      if (heroLife >= 100) {
        setGameLog("Sua vida já está cheia!");
        setIsHeroTurn(true);
        return;
      }
      const healAmount = 25;
      setGameLog(`Você usou uma poção e recuperou ${healAmount} de vida.`);
      setHeroLife((prev) => Math.min(100, prev + healAmount));
      executeVillainTurn(false);

    } else if (action === "flee") {
      setGameLog("Você fugiu correndo... Fim de jogo!");
    }
  };

  const resetGame = () => {
    setHeroLife(100);
    setVillainLife(100);
    setIsHeroTurn(true);
    setIsHeroDefending(false);
    setGameLog("O combate recomeçou! É a sua vez.");
  };

  const isGameOver = heroLife <= 0 || villainLife <= 0 || gameLog.includes("fugiu");

  return (
    <div style={{ padding: "20px", fontFamily: 'Segoe UI', maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "flex-start" }}>
        <Character 
          data={heroData} 
          isHero={true} 
          onAction={handleHeroAction} 
          isHeroTurn={isHeroTurn && !isGameOver} 
        />
        <Character 
          data={villainData} 
          isHero={false} 
          onAction={null} 
          isHeroTurn={false} 
        />
      </div>

      <div style={{
        backgroundColor: "#282828", color: "#fff", padding: "15px", borderRadius: "8px",
        textAlign: "center", fontSize: "1.2rem", margin: "20px auto", maxWidth: "600px"
      }}>
        {gameLog}
      </div>

      {isGameOver && (
        <div style={{ textAlign: "center" }}>
          <button onClick={resetGame} style={{
            padding: "12px 30px", fontSize: "1.1rem", backgroundColor: "#489b34",
            color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold"
          }}>
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}