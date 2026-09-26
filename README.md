# Pong Intervenido

> Laboratorio 3 — Videojuegos Pdú 2026, UTEC
> Entrega individual

El Pong de toda la vida, pero cruzado con dos deportes que no tienen nada
que ver entre sí: **boxeo** y **básquet**.

## La intervención

Este no es un Pong a "primero que llega a 10". Acá se juega distinto:

### Sistema de rounds (boxeo)
El partido se divide en **rounds**. Cada round se juega hasta que alguien
llega a **11 puntos**, y el partido lo gana quien primero se lleva
**3 rounds**. Entre round y round el juego se pausa, muestra quién ganó
la manga, y espera a que se presione el botón para arrancar la siguiente.

### Zonas de valor (básquet)
La cancha no vale lo mismo en todos lados. Cada lado del campo está
dividido en 3 franjas horizontales:

| Zona                     | Valor |
|--------------------------|:-----:|
| Centro (fácil de cubrir) | 1 pto |
| Franja media             | 2 pts |
| Esquinas (más difícil)   | 3 pts |

Anotar por el medio es como una bandeja. Anotarle al rival en la esquina
es un triple.

## Controles

| Jugador   | Arriba | Abajo |
|-----------|:------:|:-----:|
| Jugador 1 |  `W`   |  `S`  |
| Jugador 2 |  `↑`   |  `↓`  |

## Cómo jugarlo

No requiere instalación ni servidor. Basta con abrir `index.html` en
cualquier navegador moderno (Chrome, Firefox, Edge).

## Tecnología

Hecho 100% con **HTML, CSS y JavaScript** — sin librerías, sin
frameworks ni motores de videojuegos. Todo el sistema de entidades,
gameloop, físicas y colisiones está construido a mano con Canvas 2D.
