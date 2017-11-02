const express = require('express');
const mongoose = require('mongoose');
const Issue = require('./../models/Issue');
const methodOverride = require('method-override');

const router = express.Router();

router.route('/apitest?')
    .get(
        (req, res) => {
            Issue.find({}).then((issues) => {
                issues = JSON.stringify(issues);
                res.status(200).render('layout', {
                    issues: [issues]
                });
            }).error((err) => {
                res.status(500).render('layout', {
                    issues: `Error: ${err}`
                });
            });
        }
    )
    .post((req, res, next) => {
        const { issue_title, issue_text, created_by, assigned_to,
            status_text } = req.body;
        const issue = new Issue({
            issue_title, issue_text, created_by, assigned_to,
            status_text
        });
        issue.save().then((data) => {
            Issue.find({}).then((issues) => {
                // issues = JSON.stringify(issues);
                res.status(200).render('layout', {
                    saveMessage: "Saved successfully.",
                    issues: [issues]
                });
            }).error((err) => {
                res.status(500).render('layout', {
                    issues: `Error: ${err}`
                });
            });
        }).catch((err) => {
            Issue.find({}).then((issues) => {
                issues = JSON.stringify(issues);
                res.status(200).render('layout', {
                    saveMessage: "Saved unsuccessfully.  Please try again.",
                    issues: [issues]
                });
            }).error((err) => {
                res.status(500).render('layout', {
                    issues: `Error: ${err}`
                });
            });
        });
    })
    .put(
        (req, res) => {
            const { issue_title, issue_text, created_by, assigned_to,
              status_text, _id } = req.body;
            Issue.update({ _id: _id }, { $set: { updated_on: new Date() } });
            Issue.findById(_id, (err, issue) => {
                if (err) {
                      res.status(404).render('layout', {
                          updateMessage: "Please double check your ID and try again."
                      });
                }
                issue.set({
                    issue_title: issue_title,
                    issue_text: issue_text,
                    created_by: created_by,
                    assigned_to: assigned_to,
                    status_text: status_text,
                    updated_on: new Date()
                });
                issue.save((err, updatedIssue) => {
                    if (err) {
                        res.status(500).render('layout', {
                          updateMessage: "Updated unsuccessfully.  Please try again."
                        });
                    }
                    res.status(200).render('layout', {
                        updateMessage: "Updated successfully."
                    });
                });
            });
        }
    )
    .delete(
        (req, res, next) => {
            if (req.body._id === "") {
                return res.status(500).render('layout', {
                    deleteMessage: "No input ID."
                });
            }
            return next();
        },
        (req, res) => {
            Issue.remove({ _id: req.body._id }, (err) => {
                if (err) {
                    return res.status(500).render('layout', {
                        deleteMessage: "Deletion was unsuccessfully.  Please double check your ID and try again."
                    });
                }
                return res.status(200).render('layout', {
                    deleteMessage: "Deletion was successfully."
                });
            });
        }
    )

module.exports = router;
