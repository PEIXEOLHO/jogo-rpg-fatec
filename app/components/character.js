export default function Character({ data, isHero, onAction, isHeroTurn }) {
  const currentLife = data ? data.life : 100;
  const lifePercent = Math.max(0, currentLife) + "%";
  
  const spriteImage = isHero ? "./heroi.jpg" : "./vilao.png";

  return (
    <div className="character">
      <div className="life-bar" style={{
        position: "relative",
        height: "30px",
        backgroundColor: "#d72929",
        borderRadius: "5px",
        marginBottom: "10px",
        overflow: "hidden",
        border: "1px solid #282828"
      }}>
        <div className="life-fill" style={{
          width: lifePercent,
          height: "100%",
          backgroundColor: "#489b34",
          transition: "width 0.3s ease"
        }}></div>
        <span className="life-text" style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          textAlign: "center",
          lineHeight: "30px",
          fontWeight: "bold",
          color: "#282828"
        }}>{currentLife}</span>
      </div>

      <div className="sprite" style={{ 
        display: "flex", justifyContent: "center", alignItems: "center", 
        overflow: "hidden", backgroundColor: "#ffffff" 
      }}>
        <img 
          src={spriteImage} 
          alt={data?.name} 
          style={{ 
            width: "100%", height: "100%", objectFit: "contain",
            imageRendering: "pixelated", mixBlendMode: "multiply",
            transform: !isHero ? "scaleX(-1)" : "none"
          }} 
        />
      </div>

      <h1>{data?.name}</h1>

      {isHero && onAction && (
        <div className="actions">
          <button disabled={!isHeroTurn} onClick={() => onAction("attack")}>Atacar</button>
          <button disabled={!isHeroTurn} onClick={() => onAction("defense")}>Defender</button>
          <button disabled={!isHeroTurn} onClick={() => onAction("usePotion")}>Usar Poção</button>
          <button disabled={!isHeroTurn} onClick={() => onAction("flee")}>Correr</button>
        </div>
      )}
    </div>
  );
}