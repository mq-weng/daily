做git练习
git reset 回退版本
1.可以直接写版本号 2.用 head^ 回到上一版
    git reset –soft 不会改变stage(暂存区)区，仅仅将commit回退到了指定的提交
    git reset –mixed 不会改变工作区，但是会用指定的commit覆盖stage区也就是清空暂存区
    git reset –hard 使用指定的commit的内容覆盖stage区和工作区
回退之后再 push 必须加上 --force

git status 查看仓库状态
git diff 显示工作区与缓存区的区别
git reflog 记录每一次输入的命令

git add 把文件添加进去，实际上就是把文件修改添加到暂存区
git commit 提交更改，实际上就是把暂存区的所有内容提交到当前分支

git diff 文件名
git log 查看历史提交记录
git checkout -- 文件名 丢弃工作区的修改
git branch dev 创建分支
git checkout dev 切换分支 用git switch也行
git checkout -b dev 创建并切换到dev分支 git switch -c dev也中
git merge 合并分支
git stash 存储当前工作区 (当前分支不能提交，却需要切分支debug时用到)
git stash list 查看存储区的清单
git apply [index] 恢复指定的stash git stash drop 清空stash
git stash pop 前两步的合体


kkjn