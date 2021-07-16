import { PagableCarList } from './../../../core/model/pagableCarList';
import { MOCK_PAGABLE_CAR_LIST } from './../../../shared/constants/mocks/mockPagableCarList';
import { AppModule } from './../../../app.module';
import { CarService } from 'src/app/core/services/car.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableComponent } from './datatable.component';
import { MockCarService } from 'src/app/core/services/mocks/mock-car.service';

const MOCK_PAGE_EVENT = {
  length: 4,
  pageIndex: 1,
  pageSize: 2,
  previousPageIndex: 0
};

describe('DatatableComponent', () => {
  let component: DatatableComponent;
  let fixture: ComponentFixture<DatatableComponent>;
  let carService: CarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatatableComponent],
      providers: [{ provide: CarService, useClass: MockCarService }],
      imports: [AppModule]
    }).compileComponents();
    carService = TestBed.inject(CarService);
    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should created component to have fetched the car list', async () => {
    expect(component.pagableCarList).toEqual(MOCK_PAGABLE_CAR_LIST);
  });

  it('on next page it should call car service with page event', async () => {
    component.pageSizeOptions = [2];
    fixture.detectChanges();

    const spyOnGetServerData = spyOn(component, 'getServerData').and.callThrough();
    const spyCarService = spyOn(carService, 'getCars').and.callThrough();

    expect(component.pagableCarList).toEqual(MOCK_PAGABLE_CAR_LIST);

    let button = fixture.debugElement.nativeElement.querySelector('.mat-paginator-navigation-next');
    button.click();

    fixture.whenStable().then(() => {
      expect(spyOnGetServerData).toHaveBeenCalledWith(MOCK_PAGE_EVENT);
      expect(spyCarService).toHaveBeenCalled();
    });
    component.ngOnDestroy();
  });
});
