import React from 'react'
import { IndexRedirect, IndexRoute, Route } from 'react-router'

import Root from './components/Root'
import NotFound from './components/NotFound'

// Authentication
import SignIn from './components/Authentication/SignIn'

// Dashboard
import Dashboards from './components/Dashboards/Main'

// Articles
import Articles from './components/Articles/Index'
import Article from './components/Articles/Show'
import NewArticle from './components/Articles/New'
import EditArticle from './components/Articles/Edit'

// Employees
import Employees from './components/Employees/Index'
import Employee from './components/Employees/Show'
import NewEmployee from './components/Employees/New'
import EditEmployee from './components/Employees/Edit'

// Images
import Images from './components/Images/Index'

// Lessons
import Lessons from './components/Lessons/Index'
import NewLesson from './components/Lessons/New'
import EditLesson from './components/Lessons/Edit'

// Pages
import Pages from './components/Pages/Index'
import Page from './components/Pages/Show'
import EditPage from './components/Pages/Edit'

// Projects
import Projects from './components/Projects/Index'
import Project from './components/Projects/Show'
import NewProject from './components/Projects/New'
import EditProject from './components/Projects/Edit'

// Screencasts
import Screencasts from './components/Screencasts/Index'
import NewScreencast from './components/Screencasts/New'
import EditScreencast from './components/Screencasts/Edit'

// Tags
import Tags from './components/Tags/Index'
import NewTag from './components/Tags/New'
import EditTag from './components/Tags/Edit'

// Testimonials
import Testimonials from './components/Testimonials/Index'
import Testimonial from './components/Testimonials/Show'
import NewTestimonial from './components/Testimonials/New'
import EditTestimonial from './components/Testimonials/Edit'

// Topics
import Topics from './components/Topics/Index'
import NewTopic from './components/Topics/New'
import EditTopic from './components/Topics/Edit'

export default (
  <Route path='/' component={ Root }>
    <IndexRoute component={ Dashboards } />
    <Route path='articles'>
      <IndexRoute component={ Articles } />
      <Route path='new' component={ NewArticle } />
      <Route path=':articleID/edit' component={ EditArticle } />
      <Route path=':articleID' component={ Article } />
    </Route>
    <Route path='employees'>
      <IndexRoute component={ Employees } />
      <Route path='new' component={ NewEmployee } />
      <Route path=':employeeID/edit' component={ EditEmployee } />
      <Route path=':employeeID' component={ Employee } />
    </Route>
    <Route path='images' component={ Images } />
    <Route path='pages'>
      <IndexRoute component={ Pages } />
      <Route path=':slug/edit' component={ EditPage } />
      <Route path=':slug' component={ Page } />
    </Route>
    <Route path='projects'>
      <IndexRoute component={ Projects } />
      <Route path='new' component={ NewProject } />
      <Route path=':projectID/edit' component={ EditProject } />
      <Route path=':projectID' component={ Project } />
    </Route>
    <Route path='tags'>
      <IndexRoute component={ Tags } />
      <Route path='new' component={ NewTag } />
      <Route path=':tagID/edit' component={ EditTag } />
    </Route>
    <Route path='testimonials'>
      <IndexRoute component={ Testimonials } />
      <Route path='new' component={ NewTestimonial } />
      <Route path=':testimonialID/edit' component={ EditTestimonial } />
      <Route path=':testimonialID' component={ Testimonial } />
    </Route>
    <Route path='topics'>
      <IndexRoute component={ Topics } />
      <Route path='new' component={ NewTopic } />
      <Route path=':topicID'>
        <Route path='edit' component={ EditTopic } />
        <Route path='screencasts'>
          <IndexRoute component={ Screencasts } />
          <Route path='new' component={ NewScreencast } />
          <Route path=':screencastID'>
            <Route path='edit' component={ EditScreencast } />
            <Route path='lessons'>
              <IndexRoute component={ Lessons } />
              <Route path='new' component={ NewLesson } />
              <Route path=':lessonID/edit' component={ EditLesson } />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path='sign-in' component={ SignIn } />
    <Route path='not-found' component={ NotFound } />
    <Route path='*' component={ NotFound } />
  </Route>
)
