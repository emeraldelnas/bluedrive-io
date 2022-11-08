import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStickify]',
})
export class StickifyDirective {
  private sideDetailsOffset = 0;
  private sideDetailsWidth = 0;
  private appWrapper!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.appWrapper = document.getElementsByTagName('main')[0] as HTMLElement;
      this.sideDetailsOffset = this.el.nativeElement.offsetTop;
      this.sideDetailsWidth = this.el.nativeElement.offsetWidth; // minus 16px for the gap
    }, 500);
  }

  @HostListener('window:scroll', []) onWindowScroll(): void {
    if (this.el.nativeElement) {
      if (window.scrollY > this.sideDetailsOffset) {
        if (window.innerHeight > this.el.nativeElement.offsetHeight) {
          if (this.appWrapper.offsetHeight > 540) {
            this.renderer.addClass(this.el.nativeElement, 'stickify');
            this.renderer.setStyle(
              this.el.nativeElement,
              'width',
              `${this.sideDetailsWidth}px`
            );
            this.renderer.setStyle(this.el.nativeElement, 'margin-top', '0');
          }
        }
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'stickify');
        this.renderer.removeStyle(this.el.nativeElement, 'width');
        this.renderer.setStyle(this.el.nativeElement, 'margin-top', '2.6rem');
      }
    }
  }
}
