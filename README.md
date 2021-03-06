React扫雷
=========

一款简单的扫雷游戏，使用React.js实现。

特点
----

* 只支持单击挖开方块的操作，不支持手动标雷（大多数情况下，雷会被自动标记上，不用手动标雷）。
* 支持通过LocalStorage存储游戏记录，并支持导出JSON格式或dbf格式的数据（dbf格式的数据不包含雷区的具体分布以及每步具体的点击位置）。

方块挖开规则
------------

1. 当雷区中存在雷数为0的方块时，将其相邻的8个方块挖开。
2. 当雷区中存在雷数不为0的方块，且相邻未挖开的方块数等于该方块对应的雷数时，将周围未挖开的方块标记为有雷方块。
3. 当雷区中存在雷数不为0的方块，且相邻的被标记为有雷方块的数量等于该方块对应的雷数时，将周围未标记的方块挖开。
4. 为雷区中每个方块重复步骤1、2、3，直到雷区中没有方块被挖开。
