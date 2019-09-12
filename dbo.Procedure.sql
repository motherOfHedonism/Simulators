CREATE PROCEDURE [dbo].[progressPro]
AS
	SELECT progress.id, progress.id_user, word, mark from progress, words where words.id = (SELECT id_word from syll_mirror where id = progress.id_exercice)
RETURN 0

