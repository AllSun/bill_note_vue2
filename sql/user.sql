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

 Date: 19/05/2025 15:49:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `ctime` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `signature` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (5, '孙金榜', '1689220916603', 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png', '复制粘贴完成项目', '123456');
INSERT INTO `user` VALUES (6, '张未利', '1689758098572', 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png', '世界和平。', '123456');
INSERT INTO `user` VALUES (7, '孙墨衍', '1720084995294', '//s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png', '世界和平。', '123456');
INSERT INTO `user` VALUES (8, '测试用户', '1720085024118', '//s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png', '世界和平。', '123456');
INSERT INTO `user` VALUES (9, '孙', '1721013694955', '//s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png', '世界和平。', '123456');
INSERT INTO `user` VALUES (10, ' 临时用户', '1747192599493', '//s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png', '世界和平。', '123456');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
