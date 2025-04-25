import { Component } from '@/shared/model/component.mjs'
import './dashboard-skeleton.scss'

export const DashboardSkeleton = new Component({
  render: function () {
    return /* html */ `
      <div class="dashboard-loading">
        <div class="dashboard-loading__sidebar">
          <div class="dashboard-loading__header"></div>
          <nav class="dashboard-loading__nav">
            <ul class="dashboard-loading__nav-items">
              <li><div class="dashboard-loading__link"></div></li>
              <li><div class="dashboard-loading__link"></div></li>
              <li><div class="dashboard-loading__link"></div></li>
            </ul>
          </nav>
        </div>
        <div class="dashboard-loading__content">
          <div class="dashboard-loading__content-wrapper">
            <div class="dashboard-loading__title"></div>
            <div class="dashboard-loading__cards">
              <div class="dashboard-loading__card"></div>
              <div class="dashboard-loading__card"></div>
              <div class="dashboard-loading__card"></div>
            </div>
            <div class="dashboard-loading__chart"></div>
          </div>
        </div>
      </div>
    `
  },
})
