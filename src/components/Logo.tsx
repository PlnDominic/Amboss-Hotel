interface LogoProps {
  dark?: boolean;
  onClick?: () => void;
}

export default function Logo({ dark, onClick }: LogoProps) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div style={{ position: 'relative', width: 26, height: 23, flex: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderLeft: '13px solid transparent',
            borderRight: '13px solid transparent',
            borderBottom: '12px solid #b3202f',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 5,
            width: 16,
            height: 12,
            background: dark ? '#f1ece3' : '#14110f',
          }}
        />
      </div>
      <div
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 800,
          fontSize: dark ? 19 : 18,
          color: dark ? '#ffffff' : '#14110f',
        }}
      >
        anboss
      </div>
    </div>
  );
}
