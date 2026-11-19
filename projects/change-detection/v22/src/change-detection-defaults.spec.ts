import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IdentifierGenerator } from './helpers/identifier-generator.service';

@Component({
  template: '{{ value }}'
})
class NoStrategyComponent {
  value = 'initial';
}

@Component({
  template: '{{ value }}',
  changeDetection: ChangeDetectionStrategy.Eager
})
class EagerComponent {
  value = 'initial';
}

function renderAfterPlainFieldChange(component: Type<{ value: string }>): string {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  fixture.componentInstance.value = 'changed';
  fixture.detectChanges();

  return fixture.nativeElement.textContent;
}

describe('Change detection defaults in Angular 22', () => {
  it('treats a component without changeDetection as OnPush', () => {
    expect(renderAfterPlainFieldChange(NoStrategyComponent)).toBe('initial');
  });

  it('keeps the pre-v22 behaviour for an explicit Eager component', () => {
    expect(renderAfterPlainFieldChange(EagerComponent)).toBe('changed');
  });
});

describe('IdentifierGenerator', () => {
  it('generates sequential letters starting from "a"', () => {
    const generator = TestBed.inject(IdentifierGenerator);

    expect([generator.generateId(), generator.generateId(), generator.generateId()]).toEqual(['a', 'b', 'c']);
  });
});
