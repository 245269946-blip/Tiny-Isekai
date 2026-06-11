// ==================== 20. RENDERING (v3 Enhanced) ====================
// ── Enhanced drawTile: textured terrain ──
function drawTile(ctx, x, y, tile) {
  const px = x * TILE, py = y * TILE;
  ctx.imageSmoothingEnabled = false;

  switch (tile.tile) {
    case 'grass': {
      ctx.fillStyle = [PAL.grass1,PAL.grass2,PAL.grass3][tile.variant%3];
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = PAL.grassBlade;
      ctx.fillRect(px+2, py+6, 2, 4); ctx.fillRect(px+14, py+10, 2, 3);
      ctx.fillRect(px+24, py+4, 1, 3); ctx.fillRect(px+8, py+18, 2, 4);
      ctx.fillRect(px+20, py+22, 1, 3); ctx.fillRect(px+28, py+14, 2, 2);
      ctx.fillStyle = PAL.grassDetail; ctx.fillRect(px, py+28, TILE, 4);
      break;
    }
    case 'water': {
      ctx.fillStyle = PAL.water1; ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = PAL.waterDeep; ctx.fillRect(px, py+24, TILE, 8);
      const wv1 = Math.sin((x+S.time*0.025)*0.6)*2.5;
      const wv2 = Math.cos((y+S.time*0.02)*0.5)*2;
      ctx.fillStyle = PAL.waterShimmer;
      ctx.fillRect(px, py+TILE/2+wv1, TILE, 5);
      ctx.fillStyle = PAL.waterFoam;
      ctx.fillRect(px, py+TILE-6+wv2, TILE, 2);
      ctx.fillStyle = 'rgba(180,220,240,0.12)'; ctx.fillRect(px, py, TILE, 1);
      break;
    }
    case 'bridge': {
      ctx.fillStyle = PAL.bridge1; ctx.fillRect(px, py, TILE+2, TILE);
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i%2===0 ? PAL.bridge2 : PAL.bridge1;
        ctx.fillRect(px+i*9, py, 5, TILE);
      }
      ctx.fillStyle = PAL.bridgeRail; ctx.fillRect(px, py+2, TILE, 3);
      ctx.fillRect(px, py+TILE-5, TILE, 3);
      ctx.fillStyle = PAL.bridge2;
      ctx.fillRect(px+1, py, 2, TILE); ctx.fillRect(px+TILE-2, py, 2, TILE);
      break;
    }
    case 'path': {
      ctx.fillStyle = PAL.path1; ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = PAL.path2; ctx.fillRect(px+4, py+6, 6, 4);
      ctx.fillRect(px+18, py+16, 8, 4); ctx.fillRect(px+8, py+24, 10, 4);
      ctx.fillStyle = PAL.pathEdge; ctx.fillRect(px, py, TILE, 1);
      ctx.fillRect(px, py+TILE-1, TILE, 1);
      break;
    }
    case 'tree': {
      ctx.fillStyle = [PAL.grass1,PAL.grass2,PAL.grass3][tile.variant%3];
      ctx.fillRect(px, py, TILE, TILE);
      if (!tile.harvested) {
        ctx.fillStyle = PAL.woodTrunk; ctx.fillRect(px+13, py+16, 6, 16);
        ctx.fillStyle = PAL.woodBarkLight; ctx.fillRect(px+13, py+16, 2, 16);
        ctx.fillStyle = PAL.leafDark; ctx.beginPath();
        ctx.arc(px+16, py+10, 13, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = PAL.leafMid; ctx.beginPath();
        ctx.arc(px+16, py+8, 10, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = PAL.leafLight; ctx.beginPath();
        ctx.arc(px+14, py+6, 5, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(px+20, py+8, 4, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = PAL.leafHighlight;
        ctx.fillRect(px+10, py+2, 3, 2); ctx.fillRect(px+18, py+3, 2, 2);
      } else {
        ctx.fillStyle = PAL.woodTrunk; ctx.fillRect(px+14, py+22, 4, 6);
      }
      break;
    }
    case 'rock': {
      ctx.fillStyle = [PAL.grass1,PAL.grass2,PAL.grass3][tile.variant%3];
      ctx.fillRect(px, py, TILE, TILE);
      if (!tile.harvested) {
        const base = tile.ironOre ? PAL.ironRock : PAL.rockBase;
        const hi = tile.ironOre ? PAL.ironHighlight : PAL.rockHighlight;
        const lo = tile.ironOre ? '#8a5a4a' : PAL.rockShadow;
        ctx.fillStyle = base; ctx.beginPath();
        ctx.moveTo(px+5, py+28); ctx.lineTo(px+8, py+8); ctx.lineTo(px+18, py+4);
        ctx.lineTo(px+24, py+10); ctx.lineTo(px+28, py+18); ctx.lineTo(px+22, py+28);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = hi; ctx.beginPath();
        ctx.moveTo(px+9, py+12); ctx.lineTo(px+18, py+5); ctx.lineTo(px+23, py+12); ctx.closePath(); ctx.fill();
        ctx.fillStyle = lo; ctx.beginPath();
        ctx.moveTo(px+23, py+12); ctx.lineTo(px+28, py+18); ctx.lineTo(px+22, py+28);
        ctx.lineTo(px+18, py+26); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(px+13, py+8); ctx.lineTo(px+17, py+16); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(px+24, py+15); ctx.lineTo(px+22, py+22); ctx.stroke();
        if (tile.ironOre) {
          ctx.fillStyle = PAL.ironOreRed; ctx.beginPath();
          ctx.arc(px+16, py+14, 3.5, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = 'rgba(255,180,100,0.4)'; ctx.beginPath();
          ctx.arc(px+15, py+13, 1.5, 0, Math.PI*2); ctx.fill();
        }
      }
      break;
    }
    case 'berry': {
      ctx.fillStyle = [PAL.grass1,PAL.grass2,PAL.grass3][tile.variant%3];
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = '#4a6a2f'; ctx.fillRect(px+12, py+14, 8, 20);
      ctx.fillStyle = '#5a7a3f'; ctx.fillRect(px+12, py+14, 3, 20);
      if (!tile.harvested) {
        ctx.fillStyle = PAL.berryRedDark; ctx.beginPath();
        ctx.arc(px+15, py+14, 5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = PAL.berryRed; ctx.beginPath();
        ctx.arc(px+19, py+16, 4.5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = PAL.berryRedDark; ctx.beginPath();
        ctx.arc(px+11, py+18, 4, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = PAL.berryRedLight;
        ctx.beginPath(); ctx.arc(px+14, py+13, 1.5, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(px+18, py+15, 1.5, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(px+10, py+17, 1, 0, Math.PI*2); ctx.fill();
      }
      break;
    }
    case 'float_rock': {
      ctx.fillStyle = [PAL.grass1,PAL.grass2,PAL.grass3][tile.variant%3];
      ctx.fillRect(px, py, TILE, TILE);
      if (!tile.harvested) {
        const floatY = Math.sin(S.time*0.03+tile.offset)*7;
        ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.beginPath();
        ctx.ellipse(px+16, py+28, 12, 3, 0, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = PAL.starRock; ctx.beginPath();
        ctx.moveTo(px+10, py+22+floatY); ctx.lineTo(px+4, py+8+floatY);
        ctx.lineTo(px+16, py+2+floatY); ctx.lineTo(px+26, py+8+floatY);
        ctx.lineTo(px+24, py+22+floatY); ctx.closePath(); ctx.fill();
        ctx.fillStyle = PAL.starHighlight; ctx.beginPath();
        ctx.moveTo(px+10, py+12+floatY); ctx.lineTo(px+16, py+4+floatY);
        ctx.lineTo(px+24, py+12+floatY); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = PAL.starGlow; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(px+16, py+13+floatY, 14, 0, Math.PI*2); ctx.stroke();
        const sx2 = px+16, sy2 = py+13+floatY;
        ctx.fillStyle = 'rgba(255,200,230,0.7)'; ctx.fillRect(sx2-5, sy2-6, 1, 1);
        ctx.fillStyle = 'rgba(255,180,220,0.5)'; ctx.fillRect(sx2+8, sy2-2, 1, 1);
        ctx.fillRect(sx2-8, sy2+4, 1, 1);
      }
      break;
    }
    case 'walk_tree': {
      ctx.fillStyle = [PAL.grass1,PAL.grass2,PAL.grass3][tile.variant%3];
      ctx.fillRect(px, py, TILE, TILE);
      if (!tile.harvested) {
        const moveX = Math.sin(S.time*0.015+tile.phase)*4;
        ctx.fillStyle = '#5a30a0';
        ctx.fillRect(px+10+moveX, py+28, 4, 5); ctx.fillRect(px+18+moveX, py+27, 4, 6);
        ctx.fillStyle = PAL.walkTreeTrunk; ctx.fillRect(px+12+moveX, py+14, 8, 18);
        ctx.fillStyle = '#7b50b0'; ctx.fillRect(px+12+moveX, py+14, 3, 18);
        ctx.fillStyle = PAL.walkTreeLeaf; ctx.beginPath();
        ctx.arc(px+16+moveX, py+8, 14, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = PAL.walkTreeHighlight; ctx.beginPath();
        ctx.arc(px+16+moveX, py+6, 9, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#3a1060'; ctx.fillRect(px+12+moveX, py+10, 3, 4);
        ctx.fillRect(px+18+moveX, py+10, 3, 4);
        ctx.fillStyle = '#ffcc00'; ctx.fillRect(px+13+moveX, py+11, 1, 1);
        ctx.fillRect(px+19+moveX, py+11, 1, 1);
        ctx.fillStyle = 'rgba(180,150,210,0.2)'; ctx.fillRect(px+6, py+30, 8, 2);
        ctx.fillRect(px+24, py+30, 5, 2);
      }
      break;
    }
    case 'glitch': {
      const gx = Math.floor(Math.random()*4);
      ctx.fillStyle = [PAL.glitch1,PAL.glitch2,PAL.glitch3,PAL.glitch4][gx];
      ctx.fillRect(px, py, TILE/2, TILE/2);
      ctx.fillStyle = [PAL.glitch3,PAL.glitch4,PAL.glitch1,PAL.glitch2][gx];
      ctx.fillRect(px+TILE/2, py+TILE/2, TILE/2, TILE/2);
      ctx.fillStyle = '#000';
      ctx.fillRect(px+TILE/2, py, TILE/2, TILE/2);
      ctx.fillRect(px, py+TILE/2, TILE/2, TILE/2);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(px, py+8, TILE, 1); ctx.fillRect(px, py+20, TILE, 1);
      ctx.fillStyle = '#ff0'; ctx.fillRect(px+20, py+6, 3, 3);
      ctx.fillStyle = 'rgba(255,255,0,0.4)'; ctx.fillRect(px+17, py+3, 3, 3);
      break;
    }
  }
}

// ── Enhanced drawPlayer ──
function drawPlayer(ctx, camX, camY) {
  const sx = S.player.x * TILE - camX, sy = S.player.y * TILE - camY;
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath();
  ctx.ellipse(sx+TILE/2, sy+TILE, 9, 3, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = PAL.clothBlue; ctx.fillRect(sx+8, sy+10, 16, 15);
  ctx.fillStyle = PAL.clothBlueDark; ctx.fillRect(sx+8, sy+22, 16, 3);
  ctx.fillStyle = PAL.skin; ctx.fillRect(sx+9, sy+2, 14, 12);
  ctx.fillStyle = PAL.skinShadow; ctx.fillRect(sx+9, sy+12, 14, 2);
  ctx.fillStyle = PAL.hairBrown; ctx.fillRect(sx+7, sy+1, 18, 7);
  ctx.fillStyle = PAL.hairBrownLight; ctx.fillRect(sx+9, sy, 14, 3);
  ctx.fillStyle = '#4a3020'; ctx.fillRect(sx+9, sy+25, 6, 7); ctx.fillRect(sx+17, sy+25, 6, 7);
  ctx.fillStyle = '#3a2010'; ctx.fillRect(sx+8, sy+30, 7, 3); ctx.fillRect(sx+17, sy+30, 7, 3);
  const eyeOffX = [0, 2, 0, -2][S.player.facing];
  ctx.fillStyle = '#fff'; ctx.fillRect(sx+11+eyeOffX, sy+6, 3, 2); ctx.fillRect(sx+18+eyeOffX, sy+6, 3, 2);
  ctx.fillStyle = '#111'; ctx.fillRect(sx+12+eyeOffX, sy+6, 1, 2); ctx.fillRect(sx+19+eyeOffX, sy+6, 1, 2);
  ctx.fillStyle = PAL.skin;
  ctx.fillRect(sx+4, sy+10, 4, 9);
  ctx.fillRect(sx+24, sy+10, 4, 9);
}

// ── Enhanced drawNPC ──
function drawNPC(ctx, npc, camX, camY) {
  const sx = npc.x * TILE - camX, sy = npc.y * TILE - camY;
  ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath();
  ctx.ellipse(sx+TILE/2, sy+TILE, 8, 3, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = PAL.clothGreen; ctx.fillRect(sx+8, sy+10, 16, 14);
  ctx.fillStyle = PAL.clothGreenDark; ctx.fillRect(sx+8, sy+22, 16, 3);
  ctx.fillStyle = '#f4d89a'; ctx.fillRect(sx+10, sy+2, 12, 10);
  ctx.fillStyle = '#c0c0d0'; ctx.fillRect(sx+9, sy+1, 14, 7);
  ctx.fillStyle = '#d8d8e8'; ctx.fillRect(sx+10, sy, 12, 3);
  ctx.fillStyle = '#c0c0d0'; ctx.fillRect(sx+6, sy+3, 3, 5); ctx.fillRect(sx+23, sy+3, 3, 5);
  ctx.fillStyle = '#f4d89a'; ctx.fillRect(sx+7, sy+3, 2, 3); ctx.fillRect(sx+23, sy+3, 2, 3);
  ctx.fillStyle = '#3a2a1a'; ctx.fillRect(sx+10, sy+24, 5, 7); ctx.fillRect(sx+17, sy+24, 5, 7);
  ctx.fillStyle = '#2a5a2a'; ctx.fillRect(sx+12, sy+6, 3, 2); ctx.fillRect(sx+18, sy+6, 3, 2);
  ctx.fillStyle = '#f4d89a'; ctx.fillRect(sx+5, sy+10, 3, 7); ctx.fillRect(sx+24, sy+10, 3, 7);
}
