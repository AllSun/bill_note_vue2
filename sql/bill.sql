/*
 Navicat Premium Data Transfer

 Source Server         : sunjinbang
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : localhost:3306
 Source Schema         : bill_note

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : 65001

 Date: 19/05/2025 15:50:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pay_type` int(11) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `type_id` int(11) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `remark` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bill
-- ----------------------------
BEGIN;
INSERT INTO `bill` VALUES (1, 1, '20', '1621581570000', 1, '餐饮', 5, '备注信息');
INSERT INTO `bill` VALUES (2, 1, '19.00', '1690332582000', 1, '餐饮', 5, '黄焖鸡');
INSERT INTO `bill` VALUES (3, 2, '6214.00', '1690333466000', 11, '工资', 5, '');
INSERT INTO `bill` VALUES (4, 1, '90.00', '1690333503000', 3, '交通', 5, '打车');
INSERT INTO `bill` VALUES (5, 1, '500.00', '1690905600000', 9, '人情', 5, '');
INSERT INTO `bill` VALUES (6, 1, '400.00', '1690954375000', 9, '人情', 5, '放松');
INSERT INTO `bill` VALUES (7, 1, '340.00', '1690819200000', 9, '人情', 5, '');
INSERT INTO `bill` VALUES (8, 1, '12.00', '1690954861000', 1, '餐饮', 5, '');
INSERT INTO `bill` VALUES (9, 1, '16.00', '1690819200000', 1, '餐饮', 5, '');
INSERT INTO `bill` VALUES (10, 2, '9458.00', '1691569687000', 11, '工资', 5, '');
INSERT INTO `bill` VALUES (11, 1, '12.00', '1691569902000', 1, '餐饮', 5, '');
INSERT INTO `bill` VALUES (12, 1, '12.00', '1691569909000', 1, '餐饮', 5, '');
INSERT INTO `bill` VALUES (13, 2, '400.00', '1691981631000', 11, '工资', 5, '');
INSERT INTO `bill` VALUES (14, 1, '20', '1690333503000', 1, '餐饮', 5, '备注信息');
INSERT INTO `bill` VALUES (15, 1, '20', '1690333503000', 1, '餐饮', 5, '备注信息');
INSERT INTO `bill` VALUES (16, 1, '20', '1690333503000', 1, '餐饮', 5, '备注信息');
INSERT INTO `bill` VALUES (17, 1, '20', '1690333503000', 1, '餐饮', 5, '备注信息');
INSERT INTO `bill` VALUES (18, 1, '20', '1690333503000', 1, '餐饮', 5, '备注信息');
INSERT INTO `bill` VALUES (19, 1, '20', '1690333503000', 1, '餐饮', 5, '备注信息');
INSERT INTO `bill` VALUES (20, 1, '43.50', '1720713600000', 1, '餐饮', 5, '安泰食堂有点好吃');
INSERT INTO `bill` VALUES (21, 1, '1600.00', '1721059200000', 2, '服饰', 5, 'coach包包老婆');
INSERT INTO `bill` VALUES (22, 2, '207.00', '1721121594000', 14, '理财', 5, 'A股送的');
INSERT INTO `bill` VALUES (23, 1, '3.00', '1721121613000', 3, '交通', 5, '地铁');
INSERT INTO `bill` VALUES (24, 1, '3.00', '1721174371000', 1, '餐饮', 5, '早餐');
INSERT INTO `bill` VALUES (25, 1, '38.00', '1721174388000', 6, '学习', 5, '小册费用，性价比很高');
INSERT INTO `bill` VALUES (26, 1, '50.00', '1721174416000', 4, '日用', 5, '水电费');
INSERT INTO `bill` VALUES (27, 1, '280.00', '1747200352000', 9, '人情', 5, '');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
