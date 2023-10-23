import { ChangeDetectionStrategy, Component, computed, effect, signal, untracked } from '@angular/core';

const DEFAULT_COUNTER = {
    count: 0,
    ticking: false,
    speed: 1000,
    up: true,
    diff: 1,
    adhocCount: 10
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  counter = signal(DEFAULT_COUNTER)
  ticking = computed(() => this.counter().ticking)
  speed = computed(() => this.counter().speed)
  diff = computed(() => this.counter().diff)
  up = computed(() => this.counter().up)
  adhocCount = computed(() => this.counter().adhocCount)
  ticker = effect(() => {
    const ticking = this.ticking();
    const speed = this.speed();
    const diff = this.diff();
    const up = this.up();
    untracked(() => this.tick(ticking, speed, diff, up))
  })

  start = () => this.counter.update(v => ({...v, ticking: true}))
  stop = () => this.counter.update(v => ({...v, ticking: false}))
  countUp = () => this.counter.update(v => ({...v, up: true}))
  countDown = () => this.counter.update(v => ({...v, up: false}))
  incrementBy = (diff: number) => this.counter.update(v => ({...v, diff}))
  setSpeed = (speed: number) => this.counter.update(v => ({...v, speed}))
  setCount = (count: number) => this.counter.update(v => ({...v, count, adhocCount: count}))
  setAdhocCount = (count: number) => this.counter.update(v => ({...v, adhocCount: count}))
  reset = () => this.counter.set(DEFAULT_COUNTER)


  interval: NodeJS.Timeout | undefined = undefined
  tick(ticking: boolean, speed: number, diff: number, up: boolean) {
    clearInterval(this.interval)
    if (ticking) {
      const increment = up ? diff : diff * -1
      this.interval = setInterval(() => this.counter.update(v => ({...v, count: v.count + increment})), speed)
    }
  }
}
